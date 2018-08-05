/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by a proprietary notice
 * that can be found at http://neekware.com/license/PRI.html
 */

import { exec as exeCmd } from 'shelljs';
import * as path from 'path';
import * as program from 'commander';

export const PROJ_DIR = '..';
export const PROJ_PKG_PATH = path.join(PROJ_DIR, 'package.json');
const DEBUG = false;

/**
 * Update packages
 */
async function update2Latest(pkgName: string, devDep = true) {
  const pkgMgr = program.manager || 'yarn';
  let cmd = `yarn add ${pkgName}`;
  let devFlag = '-D';
  if (pkgMgr === 'npm') {
    cmd = `npm install ${pkgName}`;
    let devFlag = '--save-dev';
  }

  if (devDep) {
    cmd = `${cmd} ${devFlag}`;
  }

  console.log(`Updating ${pkgName} ...`);
  await exeCmd(cmd, { silent: !DEBUG });
}

async function updateDependencies() {
  let pkgCfg = require(PROJ_PKG_PATH);
  if (pkgCfg.hasOwnProperty('dependencies')) {
    for (const pkgName in pkgCfg.dependencies) {
      await update2Latest(pkgName, false);
    }
  }
}

async function updateDevDependencies() {
  let pkgCfg = require(PROJ_PKG_PATH);
  if (pkgCfg.hasOwnProperty('devDependencies')) {
    for (const pkgName in pkgCfg.devDependencies) {
      await update2Latest(pkgName, true);
    }
  }
}

async function main() {
  await updateDependencies();
  await updateDevDependencies();
}

program
  .version('0.0.1', '-v, --version')
  .option('-m', '--manager <manager>', 'Package manager, [yarn | npm] (default: yarn)')
  .parse(process.argv);

main().catch(err => {
  console.error(`Error updating package.json`, err);
  process.exit(111);
});

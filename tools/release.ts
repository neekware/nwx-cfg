import { exec } from 'child_process';
import { writeFile } from 'fs';
import { pick, get } from 'lodash';
import * as path from 'path';
import { resolve } from 'path';
import * as program from 'commander';
import { parse, SemVer } from 'semver';

const projName = 'nwx-cfg';
const projDir = resolve(__dirname, '..');
const porjPkgJson = require(path.join(projDir, 'package.json'));
const moduleBuildPath = path.join(projDir, 'builds', projName);
const modulePkgPath = path.join(projDir, 'builds', projName, 'package.json');
const publishOptions = `--access public --non-interactive --no-git-tag-version `;

const execute = (script: string): Promise<any> => {
  return new Promise((resolvePromise, rejectPromise) => {
    exec(script, (error, stdout, stderr) => {
      if (error) {
        rejectPromise(stderr);
      } else {
        resolvePromise(stdout);
      }
    });
  });
};

async function syncPackageData() {
  let modulePkg = require(modulePkgPath);

  // update common attributes
  const parentInfo = pick(porjPkgJson, [
    'author',
    'version',
    'license',
    'homepage',
    'repository',
    'contributors',
    'keywords',
    'bugs'
  ]);

  modulePkg = { ...modulePkg, ...parentInfo };
  // flush new files to build dir of each package
  await writeFile(modulePkgPath, JSON.stringify(modulePkg, null, 2), () => {
    console.error(`Flushed package.json  ...`);
  });
}

async function buildPackage() {
  if (program.build) {
    const cmd = `cd .. && ng build --prod && cd -`;
    console.log(cmd);
    await execute(cmd).catch(error => {
      console.log(`Failed to build @nwx/cfg ... ${error}`);
      return false;
    });
  }
  return true;
}

async function getDevVersion() {
  const lastCommit = await execute('git rev-parse HEAD');
  const commitHash = lastCommit
    .toString()
    .trim()
    .slice(0, 10);

  // 1.0.0 to become 1.0.0+dev.commitHash
  const version: SemVer = parse(porjPkgJson.version);
  const semVer = `${version.major}.${version.minor}.${version.patch}`;
  const devVersion = `${semVer}-dev-master-${commitHash}`;
  return devVersion;
}

async function main() {
  const built = await buildPackage();
  if (!built) {
    return 1;
  }

  await syncPackageData();

  let newVersion = porjPkgJson.version;
  let publishCmd = `yarn publish ${publishOptions} --new-version ${newVersion} --tag latest`;
  if (program.dev) {
    newVersion = getDevVersion();
    publishCmd = `yarn publish ${publishOptions} --new-version ${newVersion} --tag dev`;
  }

  if (program.publish) {
    console.log('Publishing new version', newVersion);
    console.log(publishCmd);
    await execute(`cd ${moduleBuildPath} && ${publishCmd}`).catch(error => {
      console.log(`Failed to publish package. ${error}`);
    });
  }
}

program
  .version('0.0.1', '-v, --version')
  .option('-b, --build', 'Build @nwx/cfg')
  .option('-p, --publish', 'Publish @nwx/cfg@latest')
  .option('-d, --dev', 'Publish @nwx/cfg@next')
  .parse(process.argv);

main();

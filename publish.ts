import { exec } from 'child_process';
import { writeFile } from 'fs';
import { pick, get } from 'lodash';
import * as path from 'path';

const porjPkgJson = require('./package.json');
const buildPath = './builds/nwx-cfg';
const modulePkgPath = `${buildPath}/package.json`;
const publishOptions = `--access public --non-interactive --no-git-tag-version --new-version ${
  porjPkgJson.version
}`;

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

export const syncData = (): void => {
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
  writeFile(
    path.join(buildPath, 'package.json'),
    JSON.stringify(modulePkg, null, 2),
    () => {
      console.error(`Flushed package.json  ...`);
    }
  );
};

async function main() {
  await syncData();

  console.log('Publishing new version', porjPkgJson.version);
  const command = `yarn publish ${publishOptions} --tag latest`;
  console.log(command);

  await execute(`cd ${buildPath} && ${command}`).catch(error => {
    console.log(`Failed to publish package. ${error}`);
  });
}

main();

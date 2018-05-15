import { exec } from 'child_process';

const jsonPkg = require('./package.json');
const version = jsonPkg.version;
const buildPath = 'builds/nwx-cfg';
const publishOptions = '--access public --non-interactive --no-git-tag-version';

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

async function main() {
  const version = jsonPkg.version;

  console.log('Publishing new version', version);

  await execute(
    ` cd ${buildPath} && yarn publish  --new-version ${version} --tag latest`
  ).catch(error => {
    console.log(`Failed to publish package. ${error}`);
  });
}

main();

import { AppCfg, TargetPlatform, HttpMethod } from 'pkgs/cfg';

export const environment: AppCfg = {
  // release version
  version: '0.0.1',
  // app name
  appName: '@nwx/cfg',
  // target (browser, mobile, desktop)
  target: TargetPlatform.web,
  // production, staging or development
  production: false
  // one or more app specific field(s)
};

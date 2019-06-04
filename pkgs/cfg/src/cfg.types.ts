/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

export enum TargetPlatform {
  // web (via browsers on desktop)
  web = 'web',
  // mobile (via NativeScript, Ionic, Cordova)
  mobile = 'mobile',
  // desktop (via Electron)
  desktop = 'desktop'
}

export enum HttpMethod {
  get = 'get',
  post = 'post'
}

export class EnvCfg {
  // release version
  version: string;
  // if a production build
  production: boolean;
  // name of this app
  appName?: string;
  // platform (browser, mobile, desktop)
  target?: TargetPlatform;
  // extra attributes
  [id: string]: any;
}

export class Cfg {
  // if target supports multi-tab apps (browsers)
  multiTab?: boolean;
  // url to login page for user authentication (for anonymous users only)
  loginPageUrl?: string;
  // url to sign-up page for user to register (for anonymous users only)
  registerPageUrl?: string;
  // url to landing page for authenticated users only
  loggedInLandingPageUrl?: string;
  // url to the page where users are redirected to after log-out
  loggedOutRedirectUrl?: string;
  // extra attributes
  [id: string]: any;
}

export class RemoteCfg {
  // url to fetch config file from
  endpoint: string;
  // http headers to be sent with request
  headers?: { [id: string]: any };
  // post body to be sent with request
  body?: { [id: string]: any };
  // http method (get, post) (if post, body will be ignored)
  method?: HttpMethod;
  // maximum time in seconds to wait for remote config response
  timeout?: number;
  // extra attributes
  [id: string]: any;
}

export class AppCfg extends EnvCfg {
  // cfg config
  cfg?: Cfg;
  // remote config (json object)
  rmtCfg?: RemoteCfg;
  // received data from remote
  rmtData?: { [id: string]: any };
  // extra modules (ext.auth, ext.log)
  [id: string]: any;
}

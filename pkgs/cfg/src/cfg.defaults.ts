/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { InjectionToken } from '@angular/core';

import { Cfg, HttpMethod, RemoteCfg, AppCfg, TargetPlatform } from './cfg.types';

export const DefaultCfg: Cfg = {
  multiTab: true,
  loginPageUrl: '/auth/login',
  registerPageUrl: '/auth/register',
  loggedInLandingPageUrl: '/',
  loggedOutRedirectUrl: '/'
};

export const DefaultRemoteCfg: RemoteCfg = {
  endpoint: null,
  method: HttpMethod.get,
  timeout: 2, // seconds
  headers: { 'Content-Type': 'application/json' },
  body: {}
};

export const DefaultAppCfg: AppCfg = {
  production: false,
  appName: '@nwx/cfg',
  target: TargetPlatform.web,
  rmtCfg: DefaultRemoteCfg,
  rmtData: {}
};

/** App configuration options */
export const CFG_OPTIONS = new InjectionToken<string>('CFG_OPTIONS');

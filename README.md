# @nwx/cfg

**A simple configuration module for Angular applications**

Library was deprecated in favor of [`@fullerstack/ngx-config`](https://github.com/neekware/fullerstack/tree/main/libs/ngx-config)


<!-- [![status-image]][status-link]
[![version-image]][version-link]
[![coverage-image]][coverage-link]
[![download-image]][download-link] -->

# Overview

**@nwx/cfg** attempts to streamline the app configuration while keeping it **DRY**.

# How to install

    npm i @nwx/cfg |OR| yarn add @nwx/cfg

# How to use

```typescript
// In your environment{prod,staging}.ts

import { AppCfg, TargetPlatform, HttpMethod } from '@nwx/cfg';

export const environment: AppCfg = {
  // release version
  version: string;
  // app name
  appName: 'Neekware',
  // target (browser, mobile, desktop)
  target: TargetPlatform.web,
  // production, staging or development
  production: true
  // one or more app specific field(s)
};
```

```typescript
// In your app.module.ts

import { CfgModule } from '@nwx/cfg';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CfgModule.forRoot(environment)],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// In your app.component.ts or (some.service.ts)

import { Component } from '@angular/core';
import { CfgService } from '@nwx/cfg';

@Component({
  selector: 'app-root'
})
export class AppComponent {
  title = '@nwx/cfg';

  constructor(public cfg: CfgService) {
    this.title = this.cfg.options.appName;
  }
}
```

# Advanced usage:

* Remote configuration

`@nwx/cfg` can also be used to fetch remote configuration prior to start of an Angular app.

```typescript
// In your environment{prod,staging}.ts

import { AppCfg, TargetPlatform, HttpMethod } from '@nwx/cfg';

export const environment: AppCfg = {
  // release version
  version: '1.0.0',
  // app name
  appName: 'Neekware',
  // target (browser, mobile, desktop)
  target: TargetPlatform.web,
  // production, staging or development
  production: true,
  // remote configuration (from the server prior to ng bootstrap)
  rmtCfg: {
    // server url to get remote config from (default = null)
    endpoint: '/api/cfg',
    // GET or POST http method to connect to remote server (default = get)
    method: HttpMethod.get,
    // Max timeout of http connection to remote server (default = 2 seconds)
    timeout: 3,
    // http headers to include in http connection to remote server
    headers: { 'Content-Type': 'application/json' }
    // body of request when using http POST method (default = {})
    body: {
      // one or more app specific field(s)
    }
  }
  // one or more app specific field(s)
};
```

```typescript
// In your app.module.ts

import { CfgModule } from '@nwx/cfg';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CfgModule.forRoot(environment)],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// In your app.component.ts or (some.service.ts)

import { Component } from '@angular/core';
import { CfgService } from '@nwx/cfg';
import { merge } from 'lodash';

@Component({
  selector: 'app-root'
})
export class AppComponent {
  title = '@nwx/cfg';
  options = {};

  constructor(public cfg: CfgService) {
    this.options = merge({ name: 'AppComponent' }, this.cfg.options};
    const remoteCfgData = this.options.rmtData;
  }
}
```

# Running the tests

To run the tests against the current environment:

    npm run ci:all

# License

Released under a ([MIT](https://github.com/neekware/nwx-cfg/blob/master/LICENSE)) license.

# Version

X.Y.Z Version

    `MAJOR` version -- making incompatible API changes
    `MINOR` version -- adding functionality in a backwards-compatible manner
    `PATCH` version -- making backwards-compatible bug fixes

[status-image]: https://secure.travis-ci.org/neekware/nwx-cfg.png?branch=master
[status-link]: http://travis-ci.org/neekware/nwx-cfg?branch=master
[version-image]: https://img.shields.io/npm/v/@nwx/cfg.svg
[version-link]: https://www.npmjs.com/package/@nwx/cfg
[coverage-image]: https://coveralls.io/repos/neekware/nwx-cfg/badge.svg
[coverage-link]: https://coveralls.io/r/neekware/nwx-cfg
[download-image]: https://img.shields.io/npm/dm/@nwx/cfg.svg
[download-link]: https://www.npmjs.com/package/@nwx/cfg

# Sponsors

[Neekware Inc.](https://github.com/neekware)

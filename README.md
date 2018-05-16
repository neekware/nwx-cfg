# @nwx/cfg

**A simple configuration module for Angular**

# Overview

**Best attempt** to streamline angular configuration while keeping it **DRY**.

# How to install

  1. npm install @nwx/cfg

  OR

  2. yarn add @nwx/cfg

# How to use

```typescript
// In your environment{prod,staging}.ts

import { AppCfg, TargetPlatform, HttpMethod } from '@nwx/cfg';

export const environment: AppCfg = {
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
      // one or more app specific fields
    }
  }
};
```

```typescript
// In your app.module.ts

import { CfgModule } from '@nwx/cfg';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CfgModule.forRoot(environment)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// In your app.component.ts or (some.service.ts)

import { Component } from '@angular/core';
import { CfgService } from 'pkgs/cfg';

@Component({
  selector: 'app-root'
})
export class AppComponent {
  title = '@nwx/cfg';
  options = {};
  constructor(public cfg: CfgService) {
    this.options = { ...this.cfg.options, ...{ pkgName: this.title } };
  }
}
```

# Running the tests

To run the tests against the current environment:

    npm test cfg

# License

Released under a ([MIT](LICENSE)) license.

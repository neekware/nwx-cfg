/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
  InjectionToken,
  APP_INITIALIZER
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppCfg } from './cfg.types';
import { CFG_OPTIONS } from './cfg.defaults';
import { CfgService } from './cfg.service';

export function remoteSettingsFactory(cfgService: CfgService): () => Promise<any> {
  return () => cfgService.loadRemoteOptions();
}

// @dynamic
@NgModule({
  imports: [CommonModule, HttpClientModule]
})
export class CfgModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CfgModule
  ) {
    if (parentModule) {
      throw new Error('CfgModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(options?: AppCfg): ModuleWithProviders {
    return {
      ngModule: CfgModule,
      providers: [
        CfgService,
        { provide: CFG_OPTIONS, useValue: options },
        {
          provide: APP_INITIALIZER,
          useFactory: remoteSettingsFactory,
          deps: [CfgService],
          multi: true
        }
      ]
    };
  }
}

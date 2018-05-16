import { TestBed, inject } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';

import { CfgService } from '../src/cfg.service';
import { AppCfg, TargetPlatform } from '../src/cfg.types';
import { CFG_OPTIONS } from '../src/cfg.defaults';
import { CfgModule } from '../src/cfg.module';

const AppEnv: AppCfg = {
  appName: '@nwx/cfg',
  production: false
};

describe('CfgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, CfgModule.forRoot(AppEnv)],
      providers: [{ provide: CFG_OPTIONS, useValue: AppEnv }]
    });
  });

  it(
    'should be created',
    inject([CfgService], (service: CfgService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should be have the config options',
    inject([CfgService, CFG_OPTIONS], (service: CfgService) => {
      expect(service.options.appName).toBe(AppEnv.appName);
    })
  );
});

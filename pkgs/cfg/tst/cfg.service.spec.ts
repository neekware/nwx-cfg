import { TestBed, inject } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';

import { CfgService } from '../src/cfg.service';
import { AppCfg, TargetPlatform } from '../src/cfg.types';
import { CFG_OPTIONS } from '../src/cfg.defaults';
import { CfgModule } from '../src/cfg.module';

const AppEnv: AppCfg = {
  version: '1.0.0',
  production: true
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
    'should be have the version options',
    inject([CfgService, CFG_OPTIONS], (service: CfgService) => {
      expect(service.options.version).toBe('1.0.0');
      expect(service.options.appName).toBe('@nwx/cfg');
    })
  );

  it(
    'should be have merged the default config options',
    inject([CfgService, CFG_OPTIONS], (service: CfgService) => {
      expect(service.options.cfg.loginPageUrl).toBe('/auth/login');
    })
  );

  it(
    'should be have merged the default rmt config options',
    inject([CfgService, CFG_OPTIONS], (service: CfgService) => {
      expect(service.options.rmtCfg.timeout).toBe(2);
    })
  );
});

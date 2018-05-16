import { CfgModule } from '../src/cfg.module';

describe('CfgModule', () => {
  let cfgModule: CfgModule;

  beforeEach(() => {
    cfgModule = new CfgModule(null);
  });

  it('should create an instance', () => {
    expect(cfgModule).toBeTruthy();
  });
});

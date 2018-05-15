/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

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

/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { get, isEmpty } from 'lodash';
import { of as observableOf } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

import { AppCfg, HttpMethod } from './cfg.types';
import { DefaultCfg, CFG_OPTIONS, DefaultRemoteCfg } from './cfg.defaults';

@Injectable({
  providedIn: 'root'
})
export class CfgService {
  constructor(@Inject(CFG_OPTIONS) private _options: AppCfg, private http: HttpClient) {
    this.updateOptions({
      cfg: DefaultCfg,
      rmtCfg: DefaultRemoteCfg,
      ...this._options,
      rmtData: {}
    });
    if (!this._options.production) {
      console.log(`CfgService ready ...`);
    }
  }

  updateOptions(data: Object) {
    this._options = { ...this._options, ...data };
  }

  loadRemoteOptions(): Promise<any> {
    const rmtCfg = get(this._options, 'rmtCfg');
    if (rmtCfg) {
      const url = get(rmtCfg, 'endpoint');
      if (url) {
        return new Promise((resolve, reject) => {
          let headers = get(rmtCfg, 'headers', {});
          if (!isEmpty(headers)) {
            headers = new HttpHeaders(headers);
          }
          const method = get(rmtCfg, 'method', HttpMethod.get);
          let methodCall = this.http.get(url, { headers: headers });
          if (method === HttpMethod.post) {
            const body = get(rmtCfg, 'body', {});
            methodCall = this.http.post(url, body, { headers: headers });
          }
          methodCall
            .pipe(
              timeout(rmtCfg.timeout * 1000),
              catchError((err: Response) => {
                if (!this._options.production) {
                  console.log(`CfgService failed ...`);
                  console.log(`${get(err, 'message')}`);
                }
                return observableOf({});
              })
            )
            .toPromise()
            .then(resp => {
              if (!isEmpty(resp)) {
                if (!this._options.production) {
                  console.log(`CfgService remote cfg fetched ...`);
                }
                this._options['rmtData'] = resp;
              }
              resolve();
            });
        });
      }
    }
    return new Promise((resolve, reject) => resolve());
  }

  get options() {
    return this._options;
  }
}

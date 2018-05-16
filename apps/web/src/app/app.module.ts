import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CfgModule } from 'pkgs/cfg';

import { environment as appCfg } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CfgModule.forRoot(appCfg)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

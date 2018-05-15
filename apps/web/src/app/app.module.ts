import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CfgModule } from 'pkgs/cfg';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CfgModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

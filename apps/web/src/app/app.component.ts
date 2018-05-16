import { Component } from '@angular/core';
import { CfgService, DefaultCfg } from 'pkgs/cfg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '@nwx/cfg';
  options = {};
  constructor(public cfg: CfgService) {
    this.title = this.cfg.options.appName;
  }
}

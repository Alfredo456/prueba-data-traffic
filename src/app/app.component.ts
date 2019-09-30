import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<simple-notifications style="z-index: 1050 !important;" [options]="options"></simple-notifications> <router-outlet> </router-outlet>'
})
export class AppComponent {
  public options;

  constructor() {
    this.options = {
      position: ['top', 'right'],
      timeOut: 5000,
      lastOnBottom: true
    };
  }
}

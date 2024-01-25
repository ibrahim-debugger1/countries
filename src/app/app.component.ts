import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mode: boolean = false;
  title = 'countries';

  constructor() {}
  /**
   * Toggles the mode property between true and false which represent dark and light mode.
   *
   * @returns {void}
   **/
  onToggleMode() {
    this.mode = !this.mode;
  }
}

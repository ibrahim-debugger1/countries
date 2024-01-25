import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  mode: boolean = false;
  @Output() toggleMode = new EventEmitter<boolean>();

  constructor() {}
  /**
   * Emits an event to app.component.ts to toggle the mode and updates the mode property.
   *
   * @emits toggleMode - Emits an event to toggle the mode.
   * @returns {void}
   **/
  changeMode() {
    this.toggleMode.emit();
    this.mode = !this.mode;
  }
}

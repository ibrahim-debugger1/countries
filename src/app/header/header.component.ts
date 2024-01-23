import { Component, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  mode : boolean = false;
  @Output() toggleMode = new EventEmitter<boolean>();

  constructor(){}

  changeMode(){
    this.toggleMode.emit();
    this.mode = !this.mode;
  }
}

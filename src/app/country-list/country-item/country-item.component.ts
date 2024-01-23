import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-country-item',
  templateUrl: './country-item.component.html',
  styleUrls: ['./country-item.component.scss']
})
export class CountryItemComponent {
  @Input() item!: any;
  @Input() mode!: boolean;
  ngOnInit(){
}
}

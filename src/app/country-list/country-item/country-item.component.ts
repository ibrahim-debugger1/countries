import { Component, Input } from '@angular/core';
import { Country } from 'src/app/country';
import { SharedDataService } from 'src/app/shared-data.service';

@Component({
  selector: 'app-country-item',
  templateUrl: './country-item.component.html',
  styleUrls: ['./country-item.component.scss'],
})
export class CountryItemComponent {
  @Input() item!: Country;
  @Input() mode!: boolean;
  constructor(private sharedDataService: SharedDataService){}
  openPopup() {
    this.sharedDataService.openPopup(this.item, this.mode);
  }
}

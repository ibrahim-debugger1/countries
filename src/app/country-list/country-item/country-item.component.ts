import { Component, Input } from '@angular/core';
import { Country } from 'src/app/country';

@Component({
  selector: 'app-country-item',
  templateUrl: './country-item.component.html',
  styleUrls: ['./country-item.component.scss'],
})
export class CountryItemComponent {
  @Input() item!: Country;
  @Input() mode!: boolean;
  ngOnInit() {}
}

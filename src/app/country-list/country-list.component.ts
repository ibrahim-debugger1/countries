import { Component, Input } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Country } from '../country';
@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent {
  @Input() mode!: boolean;
  countries: Country[] = [];
  constructor(
    private sharedDataService: SharedDataService,
    public router: Router
  ) {}
  ngOnInit() {

    this.getAllCountries();
    this.sharedDataService.countrySliceUpdated$.subscribe(
      ({ startIndex, endIndex }) => {
        this.updateData();
      }
    );
  }

  getAllCountries() {
    this.sharedDataService.getAllCountries().subscribe((data) => {
      this.countries = data.slice(0, 8);
      this.sharedDataService.saveAllCountriesData(data);
    });
  }
  updateData() {
    this.countries = this.sharedDataService.getSlicedArray();
  }
}

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

  /**
   * fetching the list of all countries using the
   * 'getAllCountries' method. Additionally, the component subscribes to the
   * 'countrySliceUpdated$' observable from the 'sharedDataService' to get the
   * sliced data to send it to the country-item component.
   *
   * @returns {void}
   **/
  ngOnInit() {
    this.getAllCountries();
    this.sharedDataService.countrySliceUpdated$.subscribe(
      ({ startIndex, endIndex }) => {
        this.updateData();
      }
    );
  }

  /**
   * Fetches the list of all countries from the shared data service.
   *
   * This method calls the 'getAllCountries' method from the 'sharedDataService'
   * and subscribes to the returned observable. Upon receiving the data, it updates
   * the component's 'countries' property with the first 8 items and saves the entire
   * country data using the 'saveAllCountriesData' method of the 'sharedDataService'.
   *
   * @returns {void}
   **/
  getAllCountries() {
    this.sharedDataService.getAllCountries().subscribe((data) => {
      this.countries = data.slice(0, 8);
      this.sharedDataService.saveAllCountriesData(data);
    });
  }

  /**
   * Updates the component's 'countries' property with the currently sliced country data.
   *
   * @returns {void}
   **/
  updateData() {
    this.countries = this.sharedDataService.getSlicedArray();
  }
}

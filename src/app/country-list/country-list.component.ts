import { Component, Input } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent {
  @Input() mode!: boolean;
  countries: any[] = [];
  constructor(
    private sharedDataService: SharedDataService,
    public router: Router
  ) {}
  ngOnInit() {

    this.getAllCountries();
    this.sharedDataService.countrySliceUpdated$.subscribe(
      ({ startIndex, endIndex }) => {
        // console.log(this.mode); here i've got the boolean of the mode
        // Update data in the parent component based on the new country slice
        this.updateData(startIndex, endIndex);
      }
    );
  }

  getAllCountries() {
    this.sharedDataService.getAllCountries().subscribe((data) => {
      this.countries = data.slice(0, 8);
      this.sharedDataService.saveAllCountriesData(data);
    });
  }
  updateData(startIndex: number, endIndex: number) {
    this.countries = this.sharedDataService.getSlicedArray();
  }
}

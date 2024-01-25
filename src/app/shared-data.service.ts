import { Injectable } from '@angular/core';
import { Observable, count } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Country } from './country';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { PopUpCountryItemComponent } from './country-list/country-item/pop-up-country-item/pop-up-country-item.component';
@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  countrySliceSource = new Subject<{
    startIndex: number;
    endIndex: number;
  }>();
  countryFilter = new Subject<{}>();
  countryFilters$ = this.countryFilter.asObservable();
  countrySliceUpdated$ = this.countrySliceSource.asObservable();
  apiUrl = 'https://restcountries.com/v3.1/all';
  allCountriesData: Country[] = [];
  slicedCountryData: Country[] = [];
  specificContinentDataOrAllContinent: Country[] = [];
  arrayLength: number = 0;
  dataSubject = new BehaviorSubject<{
    data: Country;
    mode: boolean;
  }>({
    data: this.slicedCountryData[0], // Replace with your default data
    mode: false, // Replace with your default mode value
  });
  data$ = this.dataSubject.asObservable();

  constructor(
    public router: Router,
    public http: HttpClient,
    private dialog: MatDialog
  ) {}
  /**
   * Retrieves a list of countries from a remote server.
   * This function performs an HTTP GET request to the specified API endpoint,
   * and transforms the response data to a simplified format representing
   * common details of each country, such as flag image URL, name, population,
   * region, and capital.
   *
   * @returns {Observable<Country[]>} An Observable containing an array of Country objects.
   **/
  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}`).pipe(
      map((data: any[]) =>
        data.map((item) => ({
          pic: item['flags']['png'],
          name: item['name']['common'],
          population: item['population'],
          region: item['region'],
          capital: item['capital'],
          url: item['maps']['googleMaps'],
        }))
      )
    );
  }
  /**
   * Saves the provided array of country data, performs filtering, and updates class properties.
   *
   * This function filters out countries with the name 'Israel' from the input data and updates
   * three class properties: `allCountriesData`, `specificContinentDataOrAllContinent`, and
   * `slicedCountryData`. The filtering is done in-place on the input array.
   *
   * @param {Country[]} data - An array of country data to be processed and saved.
   * @returns {void}
   **/
  saveAllCountriesData(data: Country[]): void {
    data = data.filter((item) => item['name'] != 'Israel');
    this.allCountriesData = data;
    this.specificContinentDataOrAllContinent = data;
    this.slicedCountryData = data.slice(0, Math.min(8, data.length));
  }
  /**
   * Sets the sliced country data based on the provided start and end indices,
   * updates related properties, and notifies subscribers.
   *
   * This function calculates the length of the source array (`specificContinentDataOrAllContinent`),
   * slices the array based on the provided start and end indices and they depends on the page size and the index of the page, and updates the class property
   * `slicedCountryData`. It also notifies subscribers of the slice information through the
   * `countrySliceSource` observable. Additionally, it triggers an update notification through
   * the `countriesLength` observable.
   *
   * @param {number} startIndex - The start index of the slice.
   * @param {number} endIndex - how many elements should it take from the start index.
   * @returns {void}
   **/
  setCountrySlice(startIndex: number, endIndex: number): void {
    this.arrayLength = this.specificContinentDataOrAllContinent.length;
    this.slicedCountryData = this.specificContinentDataOrAllContinent.slice(
      startIndex,
      endIndex
    );
    this.countrySliceSource.next({ startIndex, endIndex });
  }
  /**
   * Retrieves the currently sliced country data.
   *
   * This function returns the current state of the sliced country data represented by
   * the `slicedCountryData` property. The sliced array is typically set using the
   * `setCountrySlice` function.
   *
   * @returns {Country[]} The currently sliced country data.
   **/
  getSlicedArray() {
    return this.slicedCountryData;
  }
  /**
   * Filters and sets country data based on the specified continent or region and then use
   * setCountrySlice function to take a slice from that specified continent.
   * @param {string} continent - The continent or region to filter by. Use 'All' to retrieve all countries.
   * @returns {void}
   **/
  filterOnRegion(continent: string) {
    let specificContinent: Country[] = [];
    if (continent == 'All') {
      this.specificContinentDataOrAllContinent = this.allCountriesData;
    } else {
      this.allCountriesData.forEach((item) => {
        if (item['region'] == continent) specificContinent.push(item);
      });
      this.specificContinentDataOrAllContinent = specificContinent;
      // console.log(this.specificContinentDataOrAllContinent)
    }
    this.setCountrySlice(0, 8);
    this.countryFilter.next({});
  }
  /**
   * Filters and sets country data based on the entered text from the user and then use
   * setCountrySlice function to take a slice from that specified continent.
   * @param {string} continent - The continent or region to filter by. Use 'All' to retrieve all countries.
   * @returns {void}
   **/
  filterOnSearch(country: string) {
    let specificCountryInThatContinent: Country[] = [];
    let searchedLength = country.length;
    if (
      country &&
      country.toLowerCase() == 'israel'.substring(0, searchedLength)
    )
      specificCountryInThatContinent.push(
        this.allCountriesData.filter((item) => item['name'] == 'Palestine')[0]
      );
    this.specificContinentDataOrAllContinent.forEach((item) => {
      if (
        item['name'].substring(0, searchedLength).toLowerCase() ==
        country.toLowerCase()
      )
        specificCountryInThatContinent.push(item);
    });
    this.specificContinentDataOrAllContinent = specificCountryInThatContinent;
    this.setCountrySlice(
      0,
      Math.min(this.specificContinentDataOrAllContinent.length, 8)
    );
    this.countryFilter.next({});
  }
  /**
   * Retrieves the currently number of countries after filters or without filters if we
   * didn't use them yet as (filterOnSearch, filterOnRegion).
   *
   * @returns {Country[]} The currently sliced country data.
   **/
  getArraySize() {
    return this.arrayLength;
  }
  openPopup(data: Country, mode: boolean) {
    this.dataSubject.next({ data, mode });
    this.dialog.open(PopUpCountryItemComponent);
  }
}

import { Injectable } from '@angular/core';
import { Observable, count } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private countrySliceSource = new Subject<{
    startIndex: number;
    endIndex: number;
  }>();
  private countryFilter = new Subject<{}>();
  countryFilters$ = this.countryFilter.asObservable();
  private countriesLength = new Subject<{}>();
  countrySliceUpdated$ = this.countrySliceSource.asObservable();
  apiUrl = 'https://restcountries.com/v3.1/all';
  private allCountriesData: any[] = [];
  private slicedCountryData: any[] = [];
  private specificContinentData: any[] = [];
  private filterd: boolean = false;
  private arrayLength: number = 0;

  constructor(public router: Router, public http: HttpClient) {}

  getAllCountries(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  saveAllCountriesData(data: any[]): void {
    data = data.filter((item) => item['name']['common'] != 'Israel');
    console.log(data[0]);
    this.allCountriesData = data;
    this.specificContinentData = data;
    this.slicedCountryData = data.slice(0, 8);
  }

  setCountrySlice(startIndex: number, endIndex: number): void {
    this.arrayLength = this.specificContinentData.length;
    this.slicedCountryData = this.specificContinentData.slice(
      startIndex,
      endIndex
    );
    this.countrySliceSource.next({ startIndex, endIndex });
    this.countriesLength.next({});
  }

  getSlicedArray() {
    return this.slicedCountryData;
  }

  filterOnRegion(continent: string) {
    let specificContinent: any[] = [];
    if (continent == 'All') {
      this.specificContinentData = this.allCountriesData;
    } else {
      this.allCountriesData.forEach((item) => {
        if (item['region'] == continent) specificContinent.push(item);
      });
      this.specificContinentData = specificContinent;
      // console.log(this.specificContinentData)
    }
    this.setCountrySlice(0, 8);
    this.countryFilter.next({});
  }
  filterOnSearch(country: string) {
    let specificCountryInThatContinent: any[] = [];
    let searchedLength = country.length;
    if (
      country &&
      country.toLowerCase() == 'israel'.substring(0, searchedLength)
    )
      specificCountryInThatContinent.push(
        this.allCountriesData.filter(
          (item) => item['name']['common'] == 'Palestine'
        )[0]
      );
    this.specificContinentData.forEach((item) => {
      if (
        item['name']['common'].substring(0, searchedLength).toLowerCase() ==
        country.toLowerCase()
      )
        specificCountryInThatContinent.push(item);
    });
    this.specificContinentData = specificCountryInThatContinent;
    this.setCountrySlice(0, 8);
    this.countryFilter.next({});
  }
  getArraySize() {
    return this.arrayLength;
  }
}

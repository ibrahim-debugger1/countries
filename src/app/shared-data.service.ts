import { Injectable } from '@angular/core';
import { Observable, count } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Country } from './country';
import { map } from 'rxjs/operators';

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
  private allCountriesData: Country[] = [];
  private slicedCountryData: Country[] = [];
  private specificContinentDataOrAllContinent: Country[] = [];
  private arrayLength: number = 0;

  constructor(public router: Router, public http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}`).pipe(
      map((data: any[]) =>
        data.map((item) => ({
          pic: item['flags']['png'],
          name: item['name']['common'],
          population: item['population'],
          region: item['region'],
          capital: item['capital'],
        }))
      )
    );
  }

  saveAllCountriesData(data: Country[]): void {
    data = data.filter((item) => item['name'] != 'Israel');
    this.allCountriesData = data;
    this.specificContinentDataOrAllContinent = data;
    this.slicedCountryData = data.slice(0, 8);
  }

  setCountrySlice(startIndex: number, endIndex: number): void {
    this.arrayLength = this.specificContinentDataOrAllContinent.length;
    this.slicedCountryData = this.specificContinentDataOrAllContinent.slice(
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
    this.setCountrySlice(0, 8);
    this.countryFilter.next({});
  }
  getArraySize() {
    return this.arrayLength;
  }
}

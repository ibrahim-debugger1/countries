import { Observable, of, BehaviorSubject } from 'rxjs';
import { Country } from './country';
import { SharedDataService } from './shared-data.service';

export function mockSharedDataService(): any {
  return {
    countrySliceSource: new BehaviorSubject<{
      startIndex: number;
      endIndex: number;
    }>({ startIndex: 0, endIndex: 0 }),
    countryFilter: new BehaviorSubject<{}>({}),
    countryFilters$: new Observable<{}>(),
    countrySliceUpdated$: new Observable<{
      startIndex: number;
      endIndex: number;
    }>(),
    apiUrl: 'https://restcountries.com/v3.1/all',
    allCountriesData: [],
    slicedCountryData: [],
    specificContinentDataOrAllContinent: [],
    arrayLength: 0,
    dataSubject: new BehaviorSubject<{
      data: Country;
      mode: boolean;
    }>({
      data: {
        pic: 'hello',
        name: 'Country1',
        population: 15151,
        region: 'Region1',
        capital: 'Amman',
        url: '#######',
      },
      mode: false,
    }),
    data$: jasmine.createSpy('data$'),

    getAllCountries: jasmine
      .createSpy('getAllCountries')
      .and.returnValue(of([])),
    saveAllCountriesData: jasmine.createSpy('saveAllCountriesData'),
    setCountrySlice: jasmine.createSpy('setCountrySlice'),
    getSlicedArray: jasmine.createSpy('getSlicedArray').and.returnValue([]),
    filterOnRegion: jasmine.createSpy('filterOnRegion'),
    filterOnSearch: jasmine.createSpy('filterOnSearch'),
    getArraySize: jasmine.createSpy('getArraySize').and.returnValue(0),
    openPopup: jasmine.createSpy('openPopup'),
  };
}

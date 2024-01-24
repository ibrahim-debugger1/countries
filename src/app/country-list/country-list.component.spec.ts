import { CountryListComponent } from './country-list.component';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';
import { Country } from '../country';
import { of } from 'rxjs';

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let sharedDataService: SharedDataService;
  const mockData: Country[] = [
    {
      pic: 'hello',
      name: 'Palestine',
      population: 555,
      region: 'Middle East',
      capital: '###',
    },
    {
      pic: 'url-to-flag',
      name: 'Israel',
      population: 1000000,
      region: 'Region',
      capital: 'Capital City',
    },
    {
      pic: 'url-to-flag',
      name: 'Country1',
      population: 1000000,
      region: 'Region',
      capital: 'Capital City',
    },
    {
      pic: 'url-to-flag',
      name: 'Country2',
      population: 1000000,
      region: 'Region',
      capital: 'Capital City',
    },
    {
      pic: 'url-to-flag',
      name: 'Country3',
      population: 1000000,
      region: 'Region',
      capital: 'Capital City',
    },
  ];


  beforeEach(() => {
    sharedDataService = new SharedDataService({} as Router, {} as any);
    component = new CountryListComponent(sharedDataService, {} as Router);
  });

  it('should call getAllCountries and subscribe to countrySliceUpdated$', () => {
    // Arrange
    const getAllCountriesSpy = spyOn(component, 'getAllCountries');
    const countrySliceUpdated$Spy = spyOn(sharedDataService.countrySliceUpdated$, 'subscribe');

    // Act
    component.ngOnInit();

    // Assert
    expect(getAllCountriesSpy).toHaveBeenCalled();
    expect(countrySliceUpdated$Spy).toHaveBeenCalled();
  });

  describe('getAllCountries', () => {
    it('should call getAllCountries, update countries, and save all countries data', () => {
      const getAllCountriesSpy = spyOn(sharedDataService, 'getAllCountries').and.returnValue(of(mockData));
      const saveAllCountriesDataSpy = spyOn(sharedDataService, 'saveAllCountriesData');

      // Act
      component.getAllCountries();

      // Assert
      expect(getAllCountriesSpy).toHaveBeenCalled();
      expect(component.countries).toEqual(mockData.slice(0, 8));
      expect(saveAllCountriesDataSpy).toHaveBeenCalledWith(mockData);
    });
  });
  describe('updateData', () => {
    it('should update countries based on sharedDataService.getSlicedArray', () => {
      const getSlicedArraySpy = spyOn(sharedDataService, 'getSlicedArray').and.returnValue(mockData);

      // Act
      component.updateData();

      // Assert
      expect(getSlicedArraySpy).toHaveBeenCalled();
      expect(component.countries).toEqual(mockData);
    });
  });
});

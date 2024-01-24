import { of } from 'rxjs';
import { Country } from './country';
import { SharedDataService } from './shared-data.service';
import { Router } from '@angular/router';
import { PaginationComponent } from './country-list/pagination/pagination.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryListHeaderComponent } from './country-list/country-list-header/country-list-header.component';

describe('SharedDataService', () => {
  let service: SharedDataService;
  let httpClientSpy: { get: jasmine.Spy };
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
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new SharedDataService({} as Router, httpClientSpy as any); // Casting to any for simplicity, replace with appropriate typing
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllCountries', () => {
    it('should retrieve countries from the API via GET', () => {
      httpClientSpy.get.and.returnValue(of(mockData));
      service.getAllCountries().subscribe((countries) => {
        expect(countries).toEqual(mockData);
      });

      expect(httpClientSpy.get).toHaveBeenCalledWith(`${service.apiUrl}`);
    });
  });

  describe('saveAllCountriesData', () => {
    it('should filter out countries with name "Israel" and update data accordingly', () => {
      // Arrange

      service.saveAllCountriesData(mockData);

      expect(service.allCountriesData.length).toBe(mockData.length - 1);
      expect(service.specificContinentDataOrAllContinent.length).toBe(
        mockData.length - 1
      );
      expect(
        service.allCountriesData.some((country) => country.name === 'Israel')
      ).toBe(false);
    });
  });
  describe('setCountrySlice', () => {
    let component: PaginationComponent;

    beforeEach(() => {
      component = new PaginationComponent(service);
    });
    it('should update slicedCountryData', () => {
      // Arrange
      const startIndex = 0;
      const endIndex = 3; // Assuming you want to slice the first 3 elements

      service.specificContinentDataOrAllContinent = mockData;

      // Act
      service.setCountrySlice(startIndex, endIndex);

      // Assert
      expect(service.slicedCountryData).toEqual(
        mockData.slice(startIndex, endIndex)
      );
    });
  });

  describe('getSlicedArray', () => {
    let component: CountryListComponent;
    beforeEach(() => {
      component = new CountryListComponent(service, {} as any);
    });
    it('should update the countries property with the sliced array from SharedDataService', () => {
      spyOn(service, 'getSlicedArray').and.returnValue(mockData);

      // Act
      component.updateData();

      // Assert
      expect(component.countries).toEqual(mockData);
    });
  });

  describe('filterOnRegion', () => {
    const mockAllCountriesData = [
      {
        pic: 'hello',
        name: 'Country1',
        population: 15151,
        region: 'Region1',
        capital: 'Amman',
      },
      {
        pic: 'hello',
        name: 'Country2',
        population: 15151,
        region: 'Region2',
        capital: 'Amman',
      },
      {
        pic: 'hello',
        name: 'Country3',
        population: 15151,
        region: 'Region1',
        capital: 'Amman',
      },
      // Add more mock data as needed
    ];
    it('should update specificContinentDataOrAllContinent depends on the region', () => {
      const mockSpecificContinent = [
        {
          pic: 'hello',
          name: 'Country1',
          population: 15151,
          region: 'Region1',
          capital: 'Amman',
        },
        {
          pic: 'hello',
          name: 'Country3',
          population: 15151,
          region: 'Region1',
          capital: 'Amman',
        },
      ];

      service.allCountriesData = mockAllCountriesData;
      const selectedValue = 'Region1';

      // Act
      service.filterOnRegion(selectedValue);

      // Assert
      expect(service.specificContinentDataOrAllContinent).toEqual(
        mockSpecificContinent
      );
    });
    it('should update specificContinentDataOrAllContinent with allCountriesData when continent is "All"', () => {
      service.allCountriesData = mockAllCountriesData;
      const selectedValue = 'All';

      // Act
      service.filterOnRegion(selectedValue);

      // Assert
      expect(service.specificContinentDataOrAllContinent).toEqual(
        mockAllCountriesData
      );
    });
  });

  describe('filterOnSearch', () => {
    let component: CountryListHeaderComponent;

    beforeEach(() => {
      component = new CountryListHeaderComponent(service);
    });
    it('should filter countries based on the provided search term', () => {
      service.allCountriesData = mockData;
      let searchTerm = 'Israel'; // Case-insensitive search term
      // Act
      service.filterOnSearch(searchTerm);

      // Assert
      // Verify that specificContinentDataOrAllContinent is correctly updated
      expect(service.specificContinentDataOrAllContinent).toEqual([
        {
          pic: 'hello',
          name: 'Palestine',
          population: 555,
          region: 'Middle East',
          capital: '###',
        },
      ]);

      service.specificContinentDataOrAllContinent = mockData;
      searchTerm = 'cou'; // Case-insensitive search term

      service.filterOnSearch(searchTerm);

      // Assert
      // Verify that specificContinentDataOrAllContinent is correctly updated
      expect(service.specificContinentDataOrAllContinent).toEqual([
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
      ]);
    });
  });
});

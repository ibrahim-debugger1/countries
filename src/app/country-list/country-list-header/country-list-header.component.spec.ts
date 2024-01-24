import { SharedDataService } from 'src/app/shared-data.service';
import { Router } from '@angular/router';
import { CountryListHeaderComponent } from './country-list-header.component';

describe('country-list-header', () => {
  let component: CountryListHeaderComponent;
  let sharedDataService: SharedDataService;

  beforeEach(() => {
    sharedDataService = new SharedDataService({} as Router, {} as any);
    component = new CountryListHeaderComponent(sharedDataService);

    // Other setup if needed
  });
  describe('onDropdownChange', () => {
    it('should call filterOnRegion with selectedValue when onDropdownChange is called', () => {
      // Arrange
      const selectedValue = 'Asia'; // Change based on your test case
      const filterOnRegionSpy = spyOn(sharedDataService, 'filterOnRegion');

      // Act
      component.selectedValue = selectedValue;
      component.onDropdownChange();

      // Assert
      expect(filterOnRegionSpy).toHaveBeenCalledWith(selectedValue);
    });
  });
  describe('onSearch', () => {
    it('should call filterOnRegion and filterOnSearch with correct values when onSearch is called', () => {
      // Arrange
      const selectedValue = 'Asia';
      const searchText = 'Palestine';
      const filterOnRegionSpy = spyOn(sharedDataService, 'filterOnRegion');
      const filterOnSearchSpy = spyOn(sharedDataService, 'filterOnSearch');

      // Act
      component.selectedValue = selectedValue;
      component.searchText = searchText;
      component.onSearch();

      // Assert
      expect(filterOnRegionSpy).toHaveBeenCalledWith(selectedValue);
      expect(filterOnSearchSpy).toHaveBeenCalledWith(searchText);
    });
  });
});

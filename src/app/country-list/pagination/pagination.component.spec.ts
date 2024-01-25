import { PaginationComponent } from './pagination.component';
import { SharedDataService } from 'src/app/shared-data.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

describe('pagination', () => {
  let component: PaginationComponent;
  let sharedDataService: SharedDataService;

  beforeEach(() => {
    sharedDataService = new SharedDataService({} as Router, {} as any,{} as MatDialog);
    component = new PaginationComponent(sharedDataService);
  });

  it('should subscribe to countryFilters$ and countrySliceUpdated$ observables', () => {
    // Arrange
    const countryFiltersSpy = spyOn(
      sharedDataService.countryFilters$,
      'subscribe'
    );
    const countrySliceUpdatedSpy = spyOn(
      sharedDataService.countrySliceUpdated$,
      'subscribe'
    );

    // Act
    component.ngOnInit();

    // Assert
    expect(countryFiltersSpy).toHaveBeenCalled();
    expect(countrySliceUpdatedSpy).toHaveBeenCalled();
  });
  describe('onPageChange', () => {
    it('should call setCountrySlice with correct values when onPageChange is called', () => {
      // Arrange
      const pageEvent: PageEvent = {
        pageIndex: 2,
        pageSize: 10,
        length: 50,
      };

      const setCountrySliceSpy = spyOn(sharedDataService, 'setCountrySlice');

      // Act
      component.onPageChange(pageEvent);

      // Assert
      expect(setCountrySliceSpy).toHaveBeenCalledWith(20, 30);
    });
  });
  describe('getLength', () => {
    it('should update the length property with the result from getArraySize', () => {
      // Arrange
      const arraySizeSpy = spyOn(
        sharedDataService,
        'getArraySize'
      ).and.returnValue(42);

      // Act
      component.getLength();

      // Assert
      expect(arraySizeSpy).toHaveBeenCalled();
      expect(component.length).toEqual(42);
    });
  });
});

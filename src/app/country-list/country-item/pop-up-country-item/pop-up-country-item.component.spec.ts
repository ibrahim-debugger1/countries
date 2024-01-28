import { ComponentFixture } from '@angular/core/testing';
import { PopUpCountryItemComponent } from './pop-up-country-item.component';
import { SharedDataService } from 'src/app/shared-data.service';
import { mockSharedDataService } from 'src/app/shared-data.service.mock';
import { of as observableOf } from 'rxjs';
import { Country } from 'src/app/country';
import Spy = jasmine.Spy;


describe('PopUpCountryItemComponent', () => {
  let component: PopUpCountryItemComponent;
  let fixture: ComponentFixture<PopUpCountryItemComponent>;
  let sharedDataService: SharedDataService;
  let mockdata : Country;
  let mode: boolean;

  beforeEach(() => {
    // Create a mock service instance with a spy on data$
    sharedDataService = mockSharedDataService();
      mockdata = {
        pic: 'hello',
        name: 'Country1',
        population: 15151,
        region: 'Region1',
        capital: 'Amman',
        url: '#######',
      }
      mode = false;

    // Create the component manually
    component = new PopUpCountryItemComponent(sharedDataService);
  });

  it('should subscribe to data$ on ngOnInit', () => {
    // Act
    component.sharedDataService.data$ = observableOf({
      data : {
        pic: 'hello',
        name: 'Country1',
        population: 15151,
        region: 'Region1',
        capital: 'Amman',
        url: '#######',
      },
      mode: false
    });
    component.ngOnInit();

    // Trigger the observable manually with the mock data
    sharedDataService.dataSubject.next({data: mockdata, mode: mode});

    // Assert
    expect(component.dataSubscription).toBeDefined();
    expect(component.item).toEqual(mockdata);
    expect(component.mode).toEqual(mode);
  });

  afterEach(() => {
    // Clean up the subscription to avoid memory leaks
    if (component.dataSubscription) {
      component.dataSubscription.unsubscribe();
    }
  });
});

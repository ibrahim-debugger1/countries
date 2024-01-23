import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryListHeaderComponent } from './country-list-header.component';

describe('CountryListHeaderComponent', () => {
  let component: CountryListHeaderComponent;
  let fixture: ComponentFixture<CountryListHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryListHeaderComponent]
    });
    fixture = TestBed.createComponent(CountryListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

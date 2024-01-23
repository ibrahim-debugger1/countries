import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryItemComponent } from './country-item.component';

describe('CountryItemComponent', () => {
  let component: CountryItemComponent;
  let fixture: ComponentFixture<CountryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryItemComponent]
    });
    fixture = TestBed.createComponent(CountryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

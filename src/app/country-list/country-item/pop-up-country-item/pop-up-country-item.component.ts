import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Country } from 'src/app/country';
import { SharedDataService } from 'src/app/shared-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pop-up-country-item',
  templateUrl: './pop-up-country-item.component.html',
  styleUrls: ['./pop-up-country-item.component.scss'],
})
export class PopUpCountryItemComponent implements OnInit, OnDestroy {
  dataSubscription: Subscription = undefined as any;
  item!: Country;
  mode!: boolean;

  constructor(public sharedDataService: SharedDataService) {}
  ngOnInit() {
    this.dataSubscription = this.sharedDataService.data$.subscribe(
      (test: { data: Country; mode: boolean; }) => {
        this.item = test.data;
        this.mode = test.mode;
      }
    );
  }
  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}

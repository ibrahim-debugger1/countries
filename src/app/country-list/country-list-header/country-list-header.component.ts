import { Component, ViewChild, Input } from '@angular/core';
import { SharedDataService } from 'src/app/shared-data.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-country-list-header',
  templateUrl: './country-list-header.component.html',
  styleUrls: ['./country-list-header.component.scss'],
})
export class CountryListHeaderComponent {
  @Input() mode!: boolean;
  selectedValue: string = 'All';
  searchText: string = '';
  constructor(private sharedDataService: SharedDataService) {}

  /**
   * filter the continent based of the event when the dropdown selection is modified.
   *
   * @returns {void}
   **/
  onDropdownChange() {
    this.sharedDataService.filterOnRegion(this.selectedValue);
  }

  /**
   * filter based on the continent if we select one and the text of the input field
   * based of the event when enter or delete any text on the input field.
   *
   * @returns {void}
   **/
  onSearch() {
    this.sharedDataService.filterOnRegion(this.selectedValue);
    this.sharedDataService.filterOnSearch(this.searchText);
  }
}

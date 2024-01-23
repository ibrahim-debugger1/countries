import { Component, ViewChild, Input } from '@angular/core';
import { SharedDataService } from 'src/app/shared-data.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-country-list-header',
  templateUrl: './country-list-header.component.html',
  styleUrls: ['./country-list-header.component.scss']
})
export class CountryListHeaderComponent {
  @Input() mode!: boolean;
  selectedValue: string = 'All';
  searchText: string = '';
  constructor(private sharedDataService: SharedDataService){}

  onDropdownChange() {
    this.sharedDataService.filterOnRegion(this.selectedValue);
  }
  onSearch(){
    this.sharedDataService.filterOnRegion(this.selectedValue);
    this.sharedDataService.filterOnSearch(this.searchText);
  }
}

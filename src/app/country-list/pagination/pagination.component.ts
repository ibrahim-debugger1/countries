import { Component, ViewChild, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SharedDataService } from 'src/app/shared-data.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() mode!: boolean;
  length: number = 0;
  currentPageIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * It subscribes to observables from the 'sharedDataService' related to country filters and slice updates.
   * When a country filter is applied, the paginator's pageIndex is reset to 0. Additionally,
   * when the country slice is updated, the 'getLength' method is called to refresh the data portion length
   *
   * @returns {void}
   **/
  ngOnInit() {
    this.sharedDataService.countryFilters$.subscribe(({}) => {
      this.paginator.pageIndex = 0;
    });
    this.sharedDataService.countrySliceUpdated$.subscribe(
      ({ startIndex, endIndex }) => {
        this.getLength();
      }
    );
  }

  constructor(private sharedDataService: SharedDataService) {}

  /**
   * Handles the page change event triggered by the paginator.
   *
   * This method is called when the user changes the page through the paginator.
   * It calculates the new start and end indices based on the event information,
   * and then calls the 'setCountrySlice' method of the 'sharedDataService' to update
   * the sliced country data accordingly.
   *
   * @param {PageEvent} event - The PageEvent object containing information about the page change such as (event.pageIndex, event.pageSize).
   * @returns {void}
   **/
  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.sharedDataService.setCountrySlice(startIndex, endIndex);
  }

  /**
   * Retrieves the length of the array from the shared data service and updates the component property.
   *
   * @returns {void}
   **/
  getLength() {
    this.length = this.sharedDataService.getArraySize();
  }
}

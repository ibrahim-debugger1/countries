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
  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.sharedDataService.setCountrySlice(startIndex, endIndex);
  }
  getLength() {
    this.length = this.sharedDataService.getArraySize();
  }
}

/* Implementation closely based on tutorial offered at:
 https://g00glen00b.be/pagination-component-angular-2/
 */

import {Component, OnInit, OnChanges, Input, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SearchService} from '../../../search.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input()
  public offset = 1;
  @Input()
  public limit = 5;
  @Input()
  public size = 1;
  @Input()
  public range = 3;

  public current: number;
  public totalNumPages: number;
  public pages: Observable<number[]>;
  @Output()
  public change: EventEmitter<number> = new EventEmitter<number>();


  constructor(private searchService: SearchService) {


  }

  ngOnInit() {

    this.getPageDetails(this.offset, this.limit, this.size);

  }

  ngOnChanges() {

    this.getPageDetails(this.offset, this.limit, this.size);

  }

  getPageDetails(_offset: number, limit: number, size: number) {
    this.current = this.calcCurrentPage(_offset, limit);
    this.totalNumPages = this.calcTotalPages(limit, size);
    this.pages = Observable.range(-this.range, this.range * 2 + 1)
      .map(offset => this.current + offset)
      .toArray();
      this.pages.subscribe(p => { console.log(p); });

  }

  public selectPage(page: number, event) {
    event.preventDefault();
    if (page > 0 && page <= this.totalNumPages) {
      this.change.emit((page - 1) * this.limit);
    }

  }

  public calcCurrentPage(offset: number, limit: number): number {
    return Math.floor(offset / limit) + 1;
  }

  public calcTotalPages(limit: number, size: number): number {
    return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
  }

  public onPageChange(offset): void {

    this.offset = offset;
    this.searchService.findInRange(offset, this.limit);

  }

}

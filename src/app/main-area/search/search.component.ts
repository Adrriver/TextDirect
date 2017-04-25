/* Implementation closely based on tutorial offered by Dimitri Mestdagh
   at: https://g00glen00b.be/pagination-component-angular-2/
 */

import {Component, OnInit, OnChanges} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Item} from '../items/item';
import {SearchService} from '../../search.service';
import {FormControl, FormGroup} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges {

  public paginationSubscription: Subscription;
  public currentResults: Array<Item>;
  public searchForm: FormGroup;
  public offset: number;
  public limit: number;
  public size: number;

  constructor(private searchService: SearchService) {

    this.paginationSubscription = this.searchService.currentPage.subscribe( current => {
                                    this.currentResults = current;
    },
      error => { console.log(error); }
    );

    this.searchForm = new FormGroup({
      isbn: new FormControl('', CustomValidators.isbn),
      title: new FormControl('')
    });

  }
  public ngOnInit() {

    this.offset = 3;
    this.limit = 5;
    this.size = 2;

  }

  public ngOnChanges() {

  }

  public onPageChange(offset): void {

    this.offset = offset;
    this.searchService.findInRange(offset, this.limit);

  }

  public onSubmit(): void {
    this.searchService.search(this.searchForm.controls['title'].value,
                              this.searchForm.controls['isbn'].value);




  }
}

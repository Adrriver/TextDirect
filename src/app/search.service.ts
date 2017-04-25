import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Item} from './main-area/items/item';
import { Http, URLSearchParams } from '@angular/http';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SearchService {

  public results: Subject<Item[]>;
  public currentPage: Subject<Item[]>;
  public searchUrl: string;
  public test: Item;
  constructor(private http: Http) {
    this.currentPage = new Subject<Array<Item>>();
    this.results = new Subject<Array<Item>>();
    this.searchUrl = 'http://localhost:8080/textdirect/search';

  }

  public search(title: string, isbn: string): void {

      const params = new URLSearchParams();

      params.set('query', title);
      const items: Array<Item> = new Array<Item>();
       this.http.get(this.searchUrl + '/isbn=' + isbn, {search: params}).map(res => res.json()).subscribe( tuples => {
          tuples.map( tuple => {
                  this.test = <Item> Object.assign(new Item(), tuple);
                  items.push(this.test);
          });
                  this.results.next(items);
    });
  }

  public findInRange(offset: number, limit: number): void {

    let current;
    this.results.asObservable().subscribe( all => {
      current = all.slice(offset, offset + (limit - 1));
      this.currentPage.next(current);
    });


  }



}

// DirectTextbook API key:  '47ac79ce5903e90ad84d7bc45ae5af45'

import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import {Item} from './main-area/items/item';
import Any = jasmine.Any;

@Injectable()
export class NewItemCreatorService {

  // TODO: Implement use of id, and pricing APIs (Google Books, Amazon, etc.)
  // TODO: Implement field validation, and

    protected static url: string;
    protected token: string;
    protected searchParams: URLSearchParams;

  constructor(private jsonp: Http) {

    // TODO: employ URL field for JAX-RS URL prefix
    NewItemCreatorService.url = 'http://localhost:8080/textdirect/search-direct-textbook';
    this.token = 'text_direct_token';
      // URL will go here
  }

  public ajaxBook(isbn: string): Observable<Any> {

    const searchParams = new URLSearchParams();
    searchParams.set('isbn', isbn);
    // searchParams.set('accept', 'application/json');
    // this.searchParams.append('Access-Control-Allow-Origin', '*');

        return this.jsonp.get(NewItemCreatorService.url,
                              {search: searchParams}).map( (res) => res.json());

  }

}

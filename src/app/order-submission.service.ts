import { Router } from '@angular/router';
import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import {MdSnackBar} from '@angular/material';
import {Item} from "./main-area/items/item";
import {Order} from "./main-area/orders/order";

@Injectable()
export class OrderSubmissionService {

  private baseUrl: string;
  public itemId: string;

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:8080/textdirect';
  }

  public submitOrder(order: Order): Observable<string> {

    const headers = new Headers({ 'Content-Type' : 'application/json'});
    const body = JSON.stringify({ order: order });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl, body, options)
                 .map( response => response.json());
  }

}

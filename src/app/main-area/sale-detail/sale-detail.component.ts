import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';
import {ActivatedRoute, Params} from '@angular/router';
import {SessionService} from '../../session.service';
import {Sale} from '../sales/sale';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent implements OnInit {

  public sale: Sale;
  public sales: Array<Sale>;
  private subscription: Subscription;

  constructor(private sessionService: SessionService,
              private route: ActivatedRoute,
              private location: Location) {

    this.subscription = this.sessionService.getSales().subscribe( res => {
        this.sales = res;
      },
      error => {
        alert(error);
      });
    this.sessionService.sales.asObservable().subscribe( res => this.sale = res[0]);
    this.sessionService.setUserAccountInfo();
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) =>
      Observable.create(this.sales.filter(sale => params['saleId'] === sale.saleId)).subscribe(
        res => { console.log(res.hasOwnProperty('saleId')); this.sale = res[0]; }));


  }

  public goBack(): void {
    this.location.back();
  }

}

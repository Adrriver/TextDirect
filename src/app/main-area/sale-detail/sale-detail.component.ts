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


  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) =>
      this.sessionService.getSale(+params['saleId']))
      .subscribe( sale => this.sale = sale['sale']);


  }

  public goBack(): void {
    this.location.back();
  }

}

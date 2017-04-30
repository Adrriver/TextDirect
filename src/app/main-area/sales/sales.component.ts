import {Component, Input, OnInit} from '@angular/core';
import {Sale} from './sale';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  @Input()
  public sales: Sale[];
  @Input()
  public sale: Sale;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public selectSale(sale: Sale): void {
    this.sale = sale;
    alert('sale selected');
    console.log(sale);
  }

  public detailView(): void {
    this.router.navigate(['/main-area/saleDetail/', this.sale.saleId]);
  }

}

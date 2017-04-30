import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from './transaction';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  @Input()
  public transactions: Transaction[];

  constructor() { }

  ngOnInit() {
  }

}

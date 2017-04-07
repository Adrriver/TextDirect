import {Component, OnInit, Input} from '@angular/core';
import { ItemCompetitorComponent } from './item-competitor/item-competitor.component';

@Component({
  selector: 'app-item-competitors',
  templateUrl: './item-competitors.component.html',
  styleUrls: ['./item-competitors.component.css']
})
export class ItemCompetitorsComponent implements OnInit {

  @Input()
  private _mockCompetitors: [{}];

  constructor() {

    this._mockCompetitors = [
      {},
      {}
    ];

  }

  ngOnInit() {
  }

}

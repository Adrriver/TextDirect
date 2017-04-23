import {Component, OnInit, Input} from '@angular/core';
import {ItemCompetitor} from './item-competitor';

@Component({
  selector: 'app-item-competitors',
  templateUrl: './item-competitors.component.html',
  styleUrls: ['./item-competitors.component.css']
})

export class ItemCompetitorsComponent implements OnInit {

  @Input()
  public competitorList: ItemCompetitor[];

  constructor() {



  }
  ngOnInit() {

    console.log('...in ItemCompetitorsComponent constructor');

  }

}

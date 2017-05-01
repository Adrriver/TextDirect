import {Component, Input, OnInit} from '@angular/core';
import {Item} from './item';
import {Router} from '@angular/router';
import {SessionService} from "../../session.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input()
  public items: Item[];
  public item: Item;

  constructor(private router: Router  ) {
  }

  ngOnInit() {
  }

  public selectItem(item: Item): void {
    this.item = item;
  }

  public detailView(): void {
      this.router.navigate(['/main-area/itemDetail/', this.item.itemId]);
  }

}

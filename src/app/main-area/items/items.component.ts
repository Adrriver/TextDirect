import {Component, Input, OnInit} from '@angular/core';
import {Item} from './item';
import {Router} from "@angular/router";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input()
  public items: Item[];
  @Input()
  public item: Item;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public selectItem(item: Item): void {
    this.item = item;
    alert('item selected');
    console.log(item);
  }

  public detailView(): void {
      this.router.navigate(['/main-area/itemDetail/', this.item.itemId]);
  }

}

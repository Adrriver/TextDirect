import {Directive, ElementRef, Input, HostListener, IterableDiffers, IterableDiffer, HostBinding} from '@angular/core';


@Directive({
  selector: '[appFormFeedbackMain]'
})
export class FormFeedbackMainDirective  {

  @Input()
  public cList;
  @HostBinding('attr.hintLabel')
  @Input() public warnLabel: string;
  public differ: IterableDiffer;

  constructor(private el: ElementRef, private differs: IterableDiffers) {

    this.cList = this.el.nativeElement.classList;
    this.differ = this.differs.find([]).create(null);

  }


  @HostListener('input')
  check() {

    const warn = this.cList.contains('ng-dirty') && this.cList.contains('ng-invalid');
    const matHint = this.el.nativeElement.querySelector('div.mat-hint');
    // const changes = (this.differ.diff(this.cList) as Array<String>).filter( item => item.contains('items.push(item.currentValue.toString()));
    if (warn) {
      if (matHint) {
        matHint.style.color = '#f44336';
        this.warnLabel = 'Invalid Format';
      }
    } else {
      if (matHint) {
        matHint.style.color = '#5e5e5e';
        this.warnLabel = '';
      }

    }

  }

}

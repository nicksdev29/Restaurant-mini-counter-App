import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-number-counter',
  templateUrl: './number-counter.component.html',
  styleUrls: ['./number-counter.component.scss']
})
export class NumberCounterComponent implements OnInit {

  /*Initializing and populating input feilds for each item where component will be called*/
  counterFormGroup = new FormGroup({
    counterformField: new FormControl()
  });
  /*Initializing and populating input feilds for each item where component will be called*/

  counterValue: number = 0;     //counter to count item quantity on increment / decrement
  min: number = 0;      //min count item quantity on increment / decrement default is 0
  max: number = 15;     //max count item quantity on increment / decrement default to 15
  itemId: number = 0;     //ID of the item quantity of which is to be updated via counter to the bill

  constructor() { }

  /*Input to get Item Id to which quantity will be updated*/

  @Input('item')
  set setCounterValue(value: number) {
    this.itemId = value;
  }
  
  /*Input to get Item Id to which quantity will be updated*/

  /*Event will be emitted and event will return an object with 
  property itemId and quantity back to component wherver couter is clled */

  @Output() onCounterChange = new EventEmitter<any>();

  getCounterValue():number{
    return this.counterValue;
  }
  
  // method to decrease quantity by step 1
  decrementCounter(): number{
    if(this.counterValue === this.min){
      this.counterValue = this.min;
      this.onCounterChange.emit({itemId: this.itemId, qty: this.counterValue});
      return this.counterValue;
    }
    this.onCounterChange.emit({itemId: this.itemId, qty: --this.counterValue});
    return this.counterValue;
  }

    // method to increase quantity by step 1
  incrementCounter(): number{
    if(this.counterValue === this.max){
      this.counterValue = this.max;
      this.onCounterChange.emit({itemId: this.itemId, qty: this.counterValue});
      return this.counterValue;
    }
    this.onCounterChange.emit({itemId: this.itemId, qty: ++this.counterValue});
    return this.counterValue;
  }

  // method will return true if value is =0 and disable decrement button
  shouldDisableDecrement(inputValue: number): boolean {
    return inputValue <= this.min;
  }

  // method will return true if value is =15 and disable increment button
  shouldDisableIncrement(inputValue: number): boolean {
    return inputValue >= this.max;
  }

  ngOnInit(): void {
  }

}

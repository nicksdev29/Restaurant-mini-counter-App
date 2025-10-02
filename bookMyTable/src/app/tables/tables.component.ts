import { Component, OnInit, PipeTransform } from '@angular/core';
import tableItemsJson from '../models/table-items.json';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ReusableComponentsModule } from '../reusable-components/reusable-components.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  tableItems:any[] = tableItemsJson;             // rendering table items json data from table-items.json

  itemCats: string[] = ["drinks", "foods", "desserts"];     //Declared and initiated categories

  itemsSubCat: any[] = [];      //declared SubCategories for items

  filterSubCat: string = "wine";    //property have the values which will be selected from dropdown

  selectedItemCat: string = "drinks";     //property have the values which will be selected from the category's toggle button

  // Items with quantity Added to bill

  itemsAddedToBill: any[] = [
    {
      addedItem: {
        id: 0,
        name: "",
        price:  0,
        quantity_type: "",
        category: "",
        sub_category: "",
        qty_per_unit: "",
        image: ""
      },
      quantity: 0
    }
  ];

  billSubTotal:number=0;      //total amount of bill items without tax 
  billTotal:number=0;         //total amount of bill items with tax
  billTax:number=0;           //tax amount accoring to gst 18%

  /* items in bill to be categorized */
  drinkItemsinBill:any = {};
  foodItemsinBill:any = {};
  dessertItemsinBill:any = {};
  /* items in bill to be categorized */

  paymentEnabled: boolean = false;      // true if bill amount payable >0 and false if =0 



  items:any[] = [];     // items array will be use to show items in grid view list

  constructor() { }

  // called whenever quantity of any item changes on event emmitter 'onCounterChange' to 
  // add and manage item to bill
  onQtyChange(item:any){
    console.log('quantity edited for item id: ', item.itemId, ' is: ', item.qty);
    // if(item.qty === 0){
    //   this.itemsAddedToBill
    // }
    let selectedItem:any = this.items.find( x => x.id === item.itemId )
    console.log('selected item is: ', selectedItem);      
    //this.itemsAddedToBill.push({addedItem: })
    this.updateBillItem(selectedItem, item.qty);
  }

  //called to update items in the bill
  updateBillItem(selectedItem:any, qty:number){
    this.drinkItemsinBill = {};
    this.foodItemsinBill = {};
    this.dessertItemsinBill = {};
    let drinkItemsTotal = 0, foodItemsTotal = 0, dessertItemsTotal = 0;

    //checking if item exists in array or not
    let itemExists = this.itemsAddedToBill.find( x => x.addedItem.id === selectedItem.id);

    //if doesnt exist then item will be added
    // if exists then quantity of item will updated according to the increment/decrement
    // item will be deleted if quantity is set to 0
    if(itemExists === undefined) {
      console.log('new item added');
      this.itemsAddedToBill.push({addedItem: selectedItem, quantity: qty});
      this.paymentEnabled = true;   
    }else {
      let index = this.itemsAddedToBill.indexOf(itemExists);
      if(qty > 0){
        this.itemsAddedToBill[index] = {addedItem: selectedItem, quantity: qty};
        console.log('edited existing item in bill: ', this.itemsAddedToBill[index]);
        this.paymentEnabled = true;
      } else {
        let deletedItem = this.itemsAddedToBill.splice(index,1);
        console.log('existing item removed from bill: ', deletedItem);
        this.paymentEnabled = false;
      }
    }

    /*process to categorize billable items to show them category wise*/

    let totalAmount = 0;
    this.itemsAddedToBill.map( (val) => {
      totalAmount += (val.addedItem.price * val.quantity);
      if(val.addedItem.category === 'drinks') {
        drinkItemsTotal += (val.addedItem.price * val.quantity)
      }
      if(val.addedItem.category === 'foods') {
        foodItemsTotal += (val.addedItem.price * val.quantity)
      }
      if(val.addedItem.category === 'desserts') {
        dessertItemsTotal += (val.addedItem.price * val.quantity)
      }
    });
    
    let drinkItems = this.itemsAddedToBill.filter( drinkItem => drinkItem.addedItem.category === 'drinks');
    this.drinkItemsinBill = {
      total: drinkItemsTotal,
      items: drinkItems
    };

    let foodItems = this.itemsAddedToBill.filter( drinkItem => drinkItem.addedItem.category === 'foods');
    this.foodItemsinBill = {
      total: foodItemsTotal,
      items: foodItems
    };

    let desertItems = this.itemsAddedToBill.filter( drinkItem => drinkItem.addedItem.category === 'desserts');
    this.dessertItemsinBill = {
      total: dessertItemsTotal,
      items: desertItems
    };
    
    /*process to categorize billable items to show them category wise*/

    this.billSubTotal = totalAmount;
    this.billTotal = Number.parseFloat( (totalAmount * (18/100) + totalAmount).toFixed(2) );
    this.billTax = Number.parseFloat( (this.billTotal - this.billSubTotal).toFixed(2) );
    console.log('total billable amount is: ', this.billTotal);    
  }

  // METHOD TO LOAD ITEMS with the subcategory to passed as parameter whenever user
  // selects a sub category from dropdown 
  loadItems(subCat:string){
    let count:number = 0;
    this.items = [];
    this.tableItems.map( (val, ind) => {
      if(subCat === val.sub_category) {
        this.items[count++] = val;
      }
    });
    console.log('Loaded Items are: ', this.items);  
  }

  // METHOD TO LOAD SUBCATEGORY with the category to passed as parameter whenever user
  // selects a category from toggle button group
  loadSubCat(itemCat:string){
    let count: number = 0;
    this.itemsSubCat = [];
    this.tableItems.map( (val:any, ind:number, arr:any) => {
      if(itemCat === val.category && this.itemsSubCat.indexOf(val.sub_category) === -1){
        this.itemsSubCat[count++] = val.sub_category;
      }
    });
    console.log('Loaded Items length is: ', this.tableItems.length);
    console.log('Loaded Items Sub-Categories are: ', this.itemsSubCat);
  }

  ngOnInit(): void {
    this.itemsAddedToBill = [];
    console.log('Table Items are: ', this.tableItems);

    // All default items and categories to be loaded on page initialization
    this.loadSubCat(this.selectedItemCat);
    this.loadItems('wine'); 
  }

}

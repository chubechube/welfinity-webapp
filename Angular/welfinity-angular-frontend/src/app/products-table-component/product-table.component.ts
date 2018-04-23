import { Component,OnInit, Input ,  OnChanges, SimpleChange ,SimpleChanges }         from '@angular/core';
import { MatTableDataSource }               from '@angular/material';




@Component({
    selector: 'product-table-component',
    templateUrl: 'product-table.component.html',
    styleUrls: ['product-table.component.css']
})

export class ProductTableComponent implements OnInit ,  OnChanges  {
    displayedColumns = ['code', 'description'];
    dataSource = new MatTableDataSource();
    dataTable: ProductElement[] =[];
   


    @Input() selected_item : ProductElement

    constructor() {}
  
    ngOnChanges(changes: SimpleChanges) {
      console.log("CHANGE");
     for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);

      if(propName == "selected_item" && this.selected_item != null){
        console.log("ADDING" + this.selected_item.code);
        this.dataTable.push({code : this.selected_item.code , description : this.selected_item.description});
        this.dataSource.data = this.dataTable;
        console.log("MY TABLE "+ this.dataTable);
        

      }
      if (changedProp.isFirstChange()) {
        console.log(`Initial value of ${propName} set to ${to}`);
       
      } else {
        let from = JSON.stringify(changedProp.previousValue);
       
        console.log(`${propName} changed from ${from} to ${to}`);
      }
    }
 
  }
      
    

    ngOnInit(){
        this.dataSource.data = [{code : "test" , description : "ret"}];
        console.log("INPUT ON INIT");
      }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  }

  export interface ProductElement {
    code: string;
    description: string;
  }

  
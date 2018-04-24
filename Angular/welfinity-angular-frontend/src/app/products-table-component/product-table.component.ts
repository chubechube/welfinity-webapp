import { Component,OnInit, Input ,  OnChanges, SimpleChange ,SimpleChanges,  }         from '@angular/core';
import { MatTableDataSource }               from '@angular/material';





@Component({
    selector: 'product-table-component',
    templateUrl: 'product-table.component.html',
    styleUrls: ['product-table.component.css'],

})

export class ProductTableComponent implements OnInit ,  OnChanges  {
    displayedColumns = ['code', 'description'];
    table_dataSource = new MatTableDataSource();
    table_dataTable: ProductElement[] =[];
   


    @Input() selected_item : ProductElement

    constructor() {}
  
    ngOnChanges(changes: SimpleChanges) {
      console.log("CHANGE");
     for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);

      if(propName == "selected_item" && this.selected_item != null){
        this.table_dataTable = [...this.table_dataTable , {code : this.selected_item.code , description : this.selected_item.description}];
        this.table_dataSource.data = this.table_dataTable;
     }
     
    }
 
  }
      
    

    ngOnInit(){
     //this.table_dataTable.push({code : "test" , description : "ret"});
     //this.table_dataSource.data=this.table_dataTable;
        console.log("INPUT ON INIT");
      }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.table_dataSource.filter = filterValue;
    }
  }

  export interface ProductElement {
    code: string;
    description: string;
  }

  
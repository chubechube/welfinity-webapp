import { Component,OnInit, Input, Output , OnChanges, SimpleChange ,SimpleChanges,  }          from '@angular/core';
import { MatTableDataSource }                                                           from '@angular/material';
import { ProductElement }                                                               from '../dashboard/dashboard.component';




@Component({
    selector: 'product-table-component',
    templateUrl: 'product-table.component.html',
    styleUrls: ['product-table.component.css'],
    
})

export class ProductTableComponent implements OnInit ,  OnChanges  {
    displayedColumns = ['code', 'description',"actions"];
    table_dataSource = new MatTableDataSource();
    table_dataTable: ProductElement[] =[];
   


    @Input() selected_item :    ProductElement
    @Input() initial_products:  ProductElement[]



    constructor()  {

  
    }

    ngOnInit(){
     
          if(this.initial_products != undefined)
          {
            this.table_dataTable = this.initial_products;
          }
      }
  

    onRemoveClicked(ProductElement){
 
      const index: number = this.table_dataTable.indexOf(ProductElement);
      if (index !== -1) {
        this.table_dataTable.splice(index, 1);
      }
      
      this.table_dataTable = [...this.table_dataTable ];
      this.table_dataSource.data = this.table_dataTable;
    }

    onClearClicked(){
      this.table_dataTable = [];
      this.table_dataSource.data = this.table_dataTable;
    }
  
    ngOnChanges(changes: SimpleChanges) {
     for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);

      if(propName == "selected_item" && this.selected_item != null){
        this.table_dataTable = [...this.table_dataTable , {code : this.selected_item.code , description : this.selected_item.description}];
        this.table_dataSource.data = this.table_dataTable;
     }

     if(propName == "initial_products" && this.initial_products != null){
      this.table_dataTable = this.initial_products;
      this.table_dataSource.data = this.table_dataTable;
   }
     
    }
 
  }
      
  createProductCodesStringArray(): Array<String>{
    var codesArray: String[] = [];
    this.table_dataTable.forEach(element => {
      codesArray.push(element.code)
      
    });

    return codesArray

  }

    addElementStrings(code : string, description: string){
      this.table_dataTable = [...this.table_dataTable , {code : code , description : description}];
      this.table_dataSource.data = this.table_dataTable;
    }

    addElementProduct(product: ProductElement){
      this.table_dataTable = [...this.table_dataTable , product];
      this.table_dataSource.data = this.table_dataTable;
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

  
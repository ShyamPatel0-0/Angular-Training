import { Component } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList: undefined | Product[];
  productMessage:undefined|string;
  iconTrash = faTrash;
  iconEdit = faEdit;
  constructor(private product:ProductService) {}
  
  ngOnInit():void {
    this.pList();
  }

  deleteProduct(id:number) {
    console.log("Product Id : ", id);
    this.product.deleteProduct(id).subscribe((result)=> {
      if(result) {
        this.productMessage= "Product is deleted";
        this.pList();
        

      }
    });
    setTimeout(()=> {
      this.productMessage = undefined
    },3000);
  }

  pList() {
    this.product.productList().subscribe((result) => {
      //console.log(result);
      this.productList = result;
    });
  }

}

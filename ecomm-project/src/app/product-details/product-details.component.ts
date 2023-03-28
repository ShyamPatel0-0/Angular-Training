import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData:undefined|Product;
  productQuantity:number = 1;
  constructor(private activeRoute:ActivatedRoute, private product:ProductService) {}
  ngOnInit():void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    //console.log(productId);
    productId && this.product.getProduct(productId).subscribe((result)=>{
      console.log(result);
      this.productData = result;
    });
  }
  handleQuantity(val:string) {
    if(this.productQuantity < 20 && val === 'plus') this.productQuantity++;
    if(this.productQuantity > 1 && val === 'min') this.productQuantity--;

  }
}

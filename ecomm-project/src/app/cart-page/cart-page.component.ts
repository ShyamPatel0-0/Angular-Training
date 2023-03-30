import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartData:cart[]|undefined;
  priceSummary:priceSummary = {
    price:0, 
    discount:0, 
    tax:0, 
    delivery:0,
    total:0
  };

  constructor(private product:ProductService, private router:Router) {}

  ngOnInit():void {
    this.product.currentCart().subscribe((result)=> {
      this.cartData = result;
      let price = 0;
      result.forEach((item)=>{
        if(item.quantity)
          price = price + +item.price * item.quantity;
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price * 0.1 ;
      this.priceSummary.tax = price * 0.18 ;
      this.priceSummary.delivery = 100;

      this.priceSummary.total = (this.priceSummary.price  + this.priceSummary.tax + this.priceSummary.delivery) - (this.priceSummary.discount);
      console.log(this.priceSummary);
      
      
    })
  }

  checkout() {
    this.router.navigate(['checkout']);
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  totalPrice:number | undefined;

  constructor(private product:ProductService, private router:Router) {}

  ngOnInit():void {
    this.product.currentCart().subscribe((result)=> {
      let price = 0;
      result.forEach((item)=>{
        if(item.quantity)
          price = price + +item.price * item.quantity;
      })
      this.totalPrice = (price + (price * 0.18) + 100) - (price * 0.1);
      console.log(this.totalPrice);
      
    })
  }


  orderNow(data:{email:string,address:string,contact:string}) {
    console.log(data);
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(this.totalPrice) {
      let orderData : order= {
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }
      this.product.orderNow(orderData).subscribe((result)=>{
        if(result) {
          alert('Order Placed');
          this.router.navigate(['/my-orders']);
        }
      })
    }
    
    
  }
}

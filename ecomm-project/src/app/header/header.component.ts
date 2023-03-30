import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = '';
  sellerName:string = '';
  searchResult:undefined|Product[];
  userName:string="";
  cartItems = 0;
  constructor(private route: Router, private product:ProductService, private activeRoute: ActivatedRoute) {}
  

  ngOnInit():void {    
    this.route.events.subscribe((data:any)=>{
      if(data.url) {        
        if(localStorage.getItem('seller') && data.url.includes('seller')) {
            //console.log("in seller area");            
            this.menuType = "seller";
            if(localStorage.getItem('seller')) {
              let sellerStore= localStorage.getItem('seller');
              let sellerData = sellerStore && JSON.parse(sellerStore)[0];
              this.sellerName = sellerData.name;
            }
        }else if(localStorage.getItem('user')) {
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore);
            this.userName = userData.name;
            this.menuType = 'user';
            this.product.getCartList(userData.id);
        } else {
          //console.log("out seller area");
          this.menuType ="default";
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }

    this.product.cartData.subscribe((items)=>{
        this.cartItems = items.length;
    })

  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }

  searchProduct(query:KeyboardEvent) {
    if(query) {
      const element = query.target as HTMLInputElement;
      //console.log(element.value);
      this.product.searchProducts(element.value).subscribe((result)=>{
        //console.log(result);
        if(result.length > 3) {
          result.length = 3;
        }          
        this.searchResult = result;
      });

    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(query:string) {
      //console.log("Query : ",query);
      this.route.navigate([`search/${query}`]);
  }
  redirectToDetails(val:number) {
    this.route.navigate([`/product/${val}`]);
  }

}

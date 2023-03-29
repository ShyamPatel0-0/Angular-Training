import { Component } from '@angular/core';
import { cart, Login, Product, SignUp } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin:boolean = true;
  authError:string = "";
  constructor(private user: UserService, private product: ProductService) {}

  ngOnInit():void {
    this.user.userAuthReload();
  }

  signUp(data:SignUp) {
    //console.log(data);
    this.user.userSignUp(data);
  }

  login(data:Login) {
    //console.log(data);
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      if(result) {
        this.authError = "Please enter valid user details";
      }else {
        setTimeout(()=>{
          this.localCartToRemoteCart();
        },500);
        
      }
    })
  }


  openLogin() {
    this.showLogin = true;
    //console.log("openLogin called : ",this.showLogin);
  }

  openSignUp() {
    this.showLogin = false;
    //console.log("OpenSignUP called : ",this.showLogin);
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(data) {
      let cartDataList:Product[] = JSON.parse(data);
      
      //console.log("user : ",user);

      cartDataList.forEach((product:Product,index) => {
       // console.log("product : ", product);
        //console.log("index : ", index);
        let cartData : cart = {
          ...product,
          productId:product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(()=>{
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result) {
              console.log("Item stored in DB");
            }
          });
          if(cartDataList.length === index+1){
            localStorage.removeItem('localCart');
          }
          
        },500);
      });
      
    }
    setTimeout(() => {
      this.product.getCartList(userId);  
    }, 2000);
    

  }

}

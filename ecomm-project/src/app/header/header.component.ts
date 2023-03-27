import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = '';
  sellerName:string = '';
  constructor(private route: Router) {}
  

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
        }else {
          //console.log("out seller area");
          this.menuType ="default";
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

}

import { Component } from '@angular/core';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  // url = 'https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=38.5&lat=-78.5';
  //  options = {
  //   method: 'GET',
  //   headers: {
  //     'content-type': 'application/octet-stream',
  //     'X-RapidAPI-Key': '59987367ccmsh3502bdcb4fefc2fp129b80jsn7861a7ed2da1',
  //     'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
  //   }
  // };

  ngOnInit():void {
    this.fun();
    
  }

  async fun() {
    // try {
    //   const response = await fetch(this.url, this.options);
    //   const result = await response.text();
    //   console.log(result);
    // } catch (error) {
    //   console.error(error);
    // }
  }

  


}

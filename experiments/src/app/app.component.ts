import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'experiments';

  ngOnInit():void {

    // this.getData()

    //   .then((data) => {
    //     console.log(data);
    //   })

    //   .catch((error) => {
    //     console.error(error);
    //   });

    this.main();  
    //console.log("yo");
    
   

  }

  // Using Promises
 getData(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Data loaded successfully");
      }, 2000);
    });
  }

  // Using Async/Await
  async getDataAsync(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Data loaded successfully");
      }, 2000);
    });
  }

  async main() {
    try {
      const data = await  this.getDataAsync();
      
      console.log(data);      
      console.log('in async function');
      
      
    } catch (error) {
      console.error(error);
    }
  }

  

  




}

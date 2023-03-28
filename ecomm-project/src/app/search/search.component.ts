import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult:undefined|Product[];
  constructor(private route:ActivatedRoute, private product: ProductService) {}

  ngOnInit():void {
    this.route.params.subscribe(params => {
      let query = this.route.snapshot.paramMap.get('query');
      // console.log(this.route.snapshot.paramMap);
       query && this.product.searchProducts(query).subscribe((data)=>{
         this.searchResult = data;
       });
    });
  }
}

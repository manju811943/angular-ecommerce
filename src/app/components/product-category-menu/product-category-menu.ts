import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/productService';
import { ProductCategory } from '../../common/product-category';

@Component({
  selector: 'app-product-category-menu',
  standalone: false,
  templateUrl: './product-category-menu.html',
  styleUrl: './product-category-menu.css'
})
export class ProductCategoryMenu implements OnInit{

  productCategories: any = [];

  constructor(private productService : ProductService){}

  ngOnInit(): void {
    this.getProductCategoriesList();
  }

  getProductCategoriesList(){
    this.productService.getProductCategoryList().subscribe(result=> {
      this.productCategories = result;
    })
  }


}

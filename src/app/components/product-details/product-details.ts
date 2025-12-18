import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/productService';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails {

  product! : Product;

  constructor(private productService: ProductService,
              private cartService: Cart,
              private route : ActivatedRoute
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    // get the Id from paramString and convertn that into numnber using Number 
    const theProductId: number = Number(this.route.snapshot.paramMap.get("id") ?? 0);
    this.productService.getProduct(theProductId).subscribe((data:any)=>{
      console.log("getProduct==>", data);
      this.product = data;
    })
  }

  addToCard(product:Product){
    const theCartItem = new CartItem(product);
    this.cartService.addToCart(theCartItem);
  }

}

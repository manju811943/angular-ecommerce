import { Component } from '@angular/core';
import { Cart } from '../../services/cart';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-cart-details',
  standalone: false,
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css'
})
export class CartDetails {

  cartItems : CartItem[]  = [];
  totalPrice : number = 0;
  totalQuantity: number = 0;

  constructor(private cartService : Cart){}

  ngOnInit(){
    this.listCardDetails();
  }

  listCardDetails() {
   this.cartItems = this.cartService.cartItems;
   this.cartService.totalPrice.subscribe (res => 
    this.totalPrice = res
   )

   this.cartService.totalQuantity.subscribe (res => 
    this.totalQuantity = res
   )
   this.cartService.computeCartTotals();
  }

  incerementQuantity(tempCartItem: CartItem) {
    this.cartService.addToCart(tempCartItem);
  }

  decrementQuantity(tempCartItem: CartItem) {
    this.cartService.decrementQuantity(tempCartItem);
  }

  remove(theCartItem: CartItem) {
  this.cartService.remove(theCartItem); 
  }
    

}

import { Component } from '@angular/core';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-cart-status',
  standalone: false,
  templateUrl: './cart-status.html',
  styleUrl: './cart-status.css'
})
export class CartStatus {

  totalPrice: number = 0.00;
  totalQuantity :number = 0;

  constructor(private cartService:Cart){}

  ngOnInit(){
    this.updateCartStatus();
  }

  updateCartStatus() {
   this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
   this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data)
  }

}

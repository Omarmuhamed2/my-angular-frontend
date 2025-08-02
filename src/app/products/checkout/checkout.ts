import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../cart/service/cart-service';
import { ProductsService } from '../service/products-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: false,
  selector: 'app-checkout',
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  name: string = '';
  address: string = '';
  phone: string = '';

  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    private router: Router,
    private toaste: ToastrService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartProduct();
    this.total = this.calculateTotal();
  }

  calculateTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }

  submitOrder() {
    const mappedItems = this.cartItems.map(item => ({
      productId: item._id || item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      image: item.image
    }));

    const orderData = {
      name: this.name,
      address: this.address,
      phone: this.phone,
      items: mappedItems,
      total: this.total
    };

    this.productService.createOrder(orderData).subscribe({
      next: (res) => {
        console.log('✅ Order placed successfully:', res);
        this.toaste.success('Order placed successfully! Thank you 😊');
        this.cartService.clearCart();
        this.router.navigate(['/products']);
      },
      error: (err) => {
                 console.error('❌ Order error:', err);
  this.toaste.error(err?.error?.msg || 'Failed to place order. Please try again.');
}

    });
  }
}

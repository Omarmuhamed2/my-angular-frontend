import { Component, OnInit } from '@angular/core';

// هنعملها كمان شوية
import { Router } from '@angular/router';
import { CartService } from '../../cart/service/cart-service';
import { ProductsService } from '../service/products-service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone:false,
  selector: 'app-checkout',
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  // بيانات الفورم
  name: string = '';
  address: string = '';
  phone: string = '';

  constructor(private cartService:CartService,
     private productService:ProductsService,
      private router: Router,
      private http:HttpClient,
      private toaste:ToastrService

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
  image: item.image // ✅ أضفنا الصورة هنا
}));


  const orderData = {
    name: this.name,
    address: this.address,
    phone: this.phone,
    items: mappedItems,
    total: this.total
  };

  console.log("🚀 Sending to backend:", orderData); // للتأكد

  this.http.post('http://localhost:5000/api/v1/orders', orderData).subscribe({
    next: (res) => {
      console.log('✅ Order placed successfully:', res);
    },
    error: (err) => {
      console.error('❌ Order error:', err);
    }
  });
  this.cartService.clearCart();
this.toaste.success('Order placed successfully! Thank you 😊');
this.router.navigate(['/products']); // أو ['thank-you'] 

}

}

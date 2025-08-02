import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../service/cart-service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { faArrowLeft, faBroom, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-carts',
  standalone: false,
  templateUrl: './carts.html',
  styleUrls: ['./carts.css']
})
export class Carts implements OnInit, OnDestroy {
  cartProduct: any[] = [];
  subscription!: Subscription;
  baseUrl = environment.apiUrl;
  faShoppingCart = faShoppingCart;
  faTrash = faTrash;
  faArrowLeft = faArrowLeft;
  faBroom = faBroom;


  constructor(private cartService: CartService,
              private location: Location,
              private router:Router
               
  ) {}

  ngOnInit(): void {
  this.subscription = this.cartService.cart$.subscribe(products => {
    this.cartProduct = products;
    console.log('Cart products:', this.cartProduct);
  });
}

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

 getTotal() {
  return this.cartProduct.reduce((acc, item) => acc + (Number(item.price) * (item.quantity || 1)), 0).toFixed(2);
}


  clearCart() {
    this.cartService.clearCart();
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  goToCheckout() {
  this.router.navigate(['/checkout']);
}
getImageUrl(imagePath: string): string {
  if (!imagePath) return '';

  // لو الرابط خارجي (postimg أو غيره) رجّعه زي ما هو
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // غير كده، نركّبه على السيرفر
  return `${environment.imageBaseUrl}${imagePath}`;
}

goBack() {
    this.location.back();
  }

}

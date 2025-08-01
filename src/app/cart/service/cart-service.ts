import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProductsSubject = new BehaviorSubject<any[]>([]);
  public cart$ = this.cartProductsSubject.asObservable(); // علشان تستخدمها في subscribe

  constructor() {}

  // ترجع كل المنتجات اللي في السلة
  getCartProduct(): any[] {
    return this.cartProductsSubject.value;
  }

  // تضيف منتج جديد
  addToCart(product: any): void {
  const current = this.cartProductsSubject.value;
  const existingProductIndex = current.findIndex(p => p._id === product._id);

  if (existingProductIndex !== -1) {
    // المنتج موجود: نزود الكمية
    const updated = [...current];
    updated[existingProductIndex].quantity = (updated[existingProductIndex].quantity || 1) + 1;
    this.cartProductsSubject.next(updated);
  } else {
    // المنتج مش موجود: نضيفه ونعينه quantity = 1
    this.cartProductsSubject.next([...current, { ...product, quantity: 1 }]);
  }
}


  // تمسح السلة كلها
  clearCart(): void {
    this.cartProductsSubject.next([]);
  }

  // تقدر تضيف method كمان لـ remove item لو حبيت
 removeFromCart(index: number): void {
  const current = this.cartProductsSubject.value;
  current.splice(index, 1); // حزف عنصر حسب ال index
  this.cartProductsSubject.next([...current]);
}

}

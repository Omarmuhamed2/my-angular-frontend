import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../cart/service/cart-service';
import { Router } from '@angular/router';
import { Auth } from '../../auth/auth';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit, OnDestroy {
  private cartSubscription!: Subscription;
  cartCounter: number = 0;
  isMenuOpen = false;


  faShoppingCart = faShoppingCart;
  faBars = faBars; // ✅ FontAwesome icon

  constructor(
    private cartservice: CartService,
    private router: Router,
    private authservice: Auth,
    private toastr: ToastrService // ✅ Toast
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartservice.cart$.subscribe((items: any[]) => {
      this.cartCounter = items.length;
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');

    this.toastr.info('تم تسجيل الخروج بنجاح', '👋 إلى اللقاء!', {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-left'
    });

    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get isAdmin(): boolean {
    return this.authservice.isAdmin();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
  

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

}

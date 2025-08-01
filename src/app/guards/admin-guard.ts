import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../auth/auth';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: Auth, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']); // لو مش أدمن ارجع للصفحة الرئيسية
      return false;
    }
  }
}

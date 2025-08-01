import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Allproducts } from './products/allproducts/allproducts';
import { Carts } from './cart/carts/carts';
import { Home } from './shared/home/home';

import { Error } from './shared/error/error';
import { Productsdetails } from './products/productsdetails/productsdetails';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { AuthGuard } from './auth/auth-guard';
import { Admin } from './products/admin/admin';
import { AdminGuard } from './guards/admin-guard';
import { Checkout } from './products/checkout/checkout';
import { AdminOrders } from './products/admin-orders/admin-orders';



const routes: Routes = [
  { path: 'home', component: Home,  },
  { path: 'products', component: Allproducts,  },
  { path: 'products/:id', component: Productsdetails },
  { path: 'cart', component: Carts },
  
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'admin', component: Admin , canActivate: [AdminGuard]},
  {path:'admin-order',component:AdminOrders , canActivate: [AdminGuard] },
  {path:'checkout' ,component:Checkout},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: Error },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

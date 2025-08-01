import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Allproducts } from './allproducts/allproducts';
import { Productsdetails } from './productsdetails/productsdetails';
import { SharedModule } from "../shared/shared-module";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Admin } from './admin/admin';
import { Checkout } from './checkout/checkout';
import { AdminOrders } from './admin-orders/admin-orders';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    Allproducts,
    Productsdetails,
    Admin,
    Checkout,
    AdminOrders,
    
    
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule

    
    
  ]
})
export class ProductsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carts } from './carts/carts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    Carts
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ]
})
export class CartMoudleModule { }

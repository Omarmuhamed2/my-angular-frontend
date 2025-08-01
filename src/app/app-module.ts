import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SharedModule } from './shared/shared-module';
import { ProductsModule } from './products/products-module';
import { CartMoudleModule } from './cart/cart-moudle-module';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';








@NgModule({
  declarations: [
    App,
    
    
    
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ProductsModule,
    CartMoudleModule,
    HttpClientModule,
     FormsModule,
     AuthModule,
     BrowserAnimationsModule,
     ToastrModule.forRoot(),
     
     

    
    
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }

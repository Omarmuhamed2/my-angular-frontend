import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart/service/cart-service';
import { ProductsService } from '../../products/service/products-service';
import { ToastrService } from 'ngx-toastr'; // ✅ جديد

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  categories: string[] = [];

  constructor(
    private cartservice: CartService,
    private prdservice: ProductsService,
    private toastr: ToastrService // ✅ جديد
  ) {}

  ngOnInit(): void {
   
  }
}

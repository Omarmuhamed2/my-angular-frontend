import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../service/products-service';
import { Location } from '@angular/common';
import { CartService } from '../../cart/service/cart-service';
import { environment } from '../../../environments/environment';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-productsdetails',
  templateUrl: './productsdetails.html',
  styleUrl: './productsdetails.css',
  standalone:false
})
export class Productsdetails implements OnInit {
baseUrl = environment.apiUrl;
  product: any;
   faArrowLeft = faArrowLeft;

  constructor(
    private route: ActivatedRoute,
    private prdService: ProductsService,
    private location: Location,
    private cartservice: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.prdService.getPrdById(id).subscribe({
        next: (res: any) => {
          this.product = res.product; // صحح المفتاح ل 'product'
          console.log(this.product);
        },
        error: (err) => {
          console.error('Error loading product details:', err);
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }

  getImageUrl(imagePath: string): string {
  return 'http://localhost:5000' + imagePath;
}

}

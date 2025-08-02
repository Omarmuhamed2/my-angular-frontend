import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products-service';
import { CartService } from '../../cart/service/cart-service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { faInfoCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.html',
  styleUrls: ['./allproducts.css'],
  standalone: false
})
export class Allproducts implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  allProducts: any[] = [];
  selectedCategory: string = 'all';
  baseUrl = environment.apiUrl;
  faShoppingCart = faShoppingCart;
  faInfoCircle = faInfoCircle;
  // ✅ حالة التحميل
  isLoadingProducts: boolean = false;

  constructor(
    private prdService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.getproducts();
    this.getCategories();
  }

  getproducts() {
    this.isLoadingProducts = true;
    this.prdService.getAllProducts().subscribe({
      next: (res: any) => {
        this.allProducts = res.products || res.product || [];
        this.products = [...this.allProducts];
        this.isLoadingProducts = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.isLoadingProducts = false;
      }
    });
  }

 getCategories() {
  this.isLoadingProducts = true; // ✅ ابدأ التحميل
  this.prdService.getAllCategories().subscribe({
    next: (res: any) => {
      this.categories = res.categories || res;
      this.isLoadingProducts = false; // ✅ انهي التحميل هنا بعد ما يخلص
    },
    error: (err) => {
      console.error('Error fetching categories:', err);
      this.isLoadingProducts = false; // ✅ انهي التحميل حتى لو حصل خطأ
    }
  });
}


  filterProducts() {
  this.isLoadingProducts = true;

  if (this.selectedCategory === 'all') {
    this.products = [...this.allProducts];
  } else {
    this.products = this.allProducts.filter(
      (p) => p.category && p.category === this.selectedCategory
    );
  }

  this.isLoadingProducts = false; // 👈 لازم تكون برّا الـ if
}

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.filterProducts();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.toaster.success('تم إضافة المنتج إلى السلة بنجاح!', 'نجاح');
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



}

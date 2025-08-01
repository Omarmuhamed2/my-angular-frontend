import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products-service';
import { CanActivate, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone:false,
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit,CanActivate {
  products: any[] = [];
  categories: any[] = [];
  selectedFile!: File;

  newProduct: any = {
    name: '',
    price: 0,
    description: '',
    image: '',
    category: '', // خليها فاضية لحد ما تجي البيانات
    company: 'whitelight', // مثلا ثابتة
    colors: ['#000'],
    featured: false,
    freeShipping: false,
    inventory: 10,
    user: ''
  };

  baseUrl = environment.apiUrl;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.productService.getAllCategories().subscribe((res: any) => {
      this.categories = res.categories || [];
      if(this.categories.length > 0) {
        this.newProduct.category = this.categories[0]._id;
      }
    });
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products = Array.isArray(res) ? res : res.product || [];
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.getProducts();
    });
  }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.getProducts();

      this.newProduct = {
        name: '',
        price: 0,
        description: '',
        image: '',
        category: this.categories.length > 0 ? this.categories[0]._id : '',
        company: 'whitelight',
        colors: ['#000'],
        featured: false,
        freeShipping: false,
        inventory: 10,
        user: ''
      };
       console.log('Sending product:', this.newProduct);

      this.router.navigate(['/products']);
    });
  }

  getImageUrl(imagePath: string): string {
  return 'http://localhost:5000' + imagePath;
}
canActivate(): boolean {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }

 onFileSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  const token = localStorage.getItem('token');

  this.http.post<{ image: string }>('http://localhost:5000/api/v1/upload', formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).subscribe({
    next: (res) => {
      this.newProduct.image = res.image; // "/uploads/xxx.jpeg"
      console.log('Image uploaded:', res.image);
    },
    error: (err) => {
      console.error('Image upload error:', err);
    }
  });
}

}

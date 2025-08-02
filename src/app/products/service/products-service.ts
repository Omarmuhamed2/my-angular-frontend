import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.apiUrl}/products`;
  private categoriesUrl = `${environment.apiUrl}/categories`;
  private ordersUrl = `${environment.apiUrl}/orders`;
  private uploadUrl = `${environment.apiUrl}/upload`;
  private imageBaseUrl = environment.imageBaseUrl;

  constructor(private http: HttpClient) {}

  // ✅ Get all products
  getAllProducts(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ✅ Get product by ID
  getPrdById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  // ✅ Get all categories
  getAllCategories(): Observable<any> {
    return this.http.get(this.categoriesUrl);
  }

  // ✅ Add new product
  addProduct(product: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    return this.http.post(this.apiUrl, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // ✅ Delete product
  deleteProduct(productId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // ✅ Get products by category
  getProductsByCategory(categoryId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}?category=${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // ✅ Create order
createOrder(orderData: any): Observable<any> {
  const token = localStorage.getItem('token');

  const headers: any = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

 return this.http.post('https://ecommerce-api-0lbj.onrender.com/api/v1/orders', orderData, { headers });


}





  // ✅ Upload image
  uploadImage(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(this.uploadUrl, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // ✅ Get full image URL
  getImageUrl(imagePath: string): string {
    return `${this.imageBaseUrl}${imagePath}`;
  }
}

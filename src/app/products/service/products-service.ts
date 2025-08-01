import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.apiUrl}/products`;
  private categoriesUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  // ✅ Get all products
  getAllProducts(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

  // ✅ Optional: Get products by category from backend (if needed)
  getProductsByCategory(categoryId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}?category=${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  createOrder(orderData: any): Observable<any> {
 return this.http.post(`${environment.apiUrl}/orders`, orderData);

}
uploadImage(formData: FormData, token: string): Observable<any> {
  return this.http.post(`${environment.apiUrl}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}


}
  
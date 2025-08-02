import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../auth/auth';
import { environment } from '../../../environments/environment';

@Component({
  standalone:false,
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.html',
  styleUrls: ['./admin-orders.css']
})
export class AdminOrders implements OnInit {
  orders: any[] = [];
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private authService:Auth 
  ) {}

  ngOnInit() {
  this.http.get(`${this.baseUrl}/api/v1/orders`, {
    headers: {
      Authorization: `Bearer ${this.authService.getToken()}`
    }
  }).subscribe((res: any) => {
    console.log("Orders Response:", res);
    this.orders = res.orders;
  });
}

getOrders(): void {
  this.http.get<any[]>(`${this.baseUrl}/api/v1/orders`)
    .subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('❌ Error loading orders:', err)
    });
}

deleteOrder(orderId: string): void {
  const confirmDelete = confirm("Are you sure you want to delete this order?");
  if (!confirmDelete) return;

  this.http.delete(`${this.baseUrl}/api/v1/orders/${orderId}`)
    .subscribe({
      next: () => {
        this.orders = this.orders.filter(order => order._id !== orderId);
        alert('🗑️ Order deleted successfully.');
      },
      error: (err) => console.error('❌ Error deleting order:', err)
    });
}

getImageUrl(imagePath: string): string {
  return environment.imageBaseUrl + imagePath;
}





}

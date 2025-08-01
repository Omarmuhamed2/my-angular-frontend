import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../auth/auth';
import { environment } from '../../environments/environment';

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
  this.http.get('http://localhost:5000/api/v1/orders', {
    headers: {
      Authorization: `Bearer ${this.authService.getToken()}`
    }
  }).subscribe((res: any) => {
    console.log("Orders Response:", res);
    this.orders = res.orders; // ✅ هنا بناخد بس المصفوفة
  });
}

  getOrders(): void {
    this.http.get<any[]>('http://localhost:5000/api/v1/orders')
      .subscribe({
        next: (data) => this.orders = data,
        error: (err) => console.error('❌ Error loading orders:', err)
        
      });
  }

  deleteOrder(orderId: string): void {
    const confirmDelete = confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    this.http.delete(`http://localhost:5000/api/v1/orders/${orderId}`)
      .subscribe({
        next: () => {
          // ✅ Remove the deleted order from UI
          this.orders = this.orders.filter(order => order._id !== orderId);
          alert('🗑️ Order deleted successfully.');
        },
        error: (err) => console.error('❌ Error deleting order:', err)
      });
  }
 getImageUrl(imagePath: string): string {
  return 'http://localhost:5000' + imagePath;
}




}

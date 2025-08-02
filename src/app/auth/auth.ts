import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
   
  constructor(private http :HttpClient){
  
  }
 login(email: string, password: string) {
  return this.http.post(
    `${environment.apiUrl}/auth//login`,
    { email, password },
    { withCredentials: true } // مهم جدًا لو السيرفر بيبعت التوكن في الكوكيز
  );
}

register(data: any) {
  return this.http.post(`${environment.apiUrl}/auth/register`, data, {
    withCredentials: true // ضروري عشان الكوكيز ترجع
  });
}
logout() {
  return this.http.get(`${environment.apiUrl}/auth/logout`, {
    withCredentials: true
  });
}
isAdmin(): boolean {
  return localStorage.getItem('role') === 'admin';
}
getToken(): string | null {
  return localStorage.getItem('token');
}



}

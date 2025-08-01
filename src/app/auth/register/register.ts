import { Component } from '@angular/core';
import { Auth } from '../auth';
import { Router } from '@angular/router';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  message = '';
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authservice: Auth, private router: Router) {}

  register() {
    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authservice.register(newUser).subscribe({
      next: (res: any) => {
        console.log('Register Success ✅', res);
        this.message = 'تم التسجيل بنجاح ✅';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        console.error('Register Failed ❌', err.error.msg);
        this.message = err.error.msg || 'فشل التسجيل ❌';
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth';
import { Router } from '@angular/router'; 
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authservice: Auth, private router: Router,private library:FaIconLibrary) {
    library.addIcons(faEnvelope, faLock);
  }

  ngOnInit(): void {}
login() {
  this.authservice.login(this.email, this.password).subscribe(
    (res: any) => {
      console.log('Login success:', res);

      // ✅ خزّن التوكن والرول وبيانات المستخدم لو حابب
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.user.role); // 👈 مهم لو هتستخدمه في الحماية
      localStorage.setItem('user', JSON.stringify(res.user)); // اختياري

      // ✅ التنقل بعد الدخول
      this.router.navigate(['/home']);
    },
    (err) => {
      console.error('Login error:', err);
    }
  );
}



  
}

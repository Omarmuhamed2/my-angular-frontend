import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// استيراد الأيقونات من مكتبة الفونت أوسم
import { faFacebookF, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { PrivacyPolicyComponent } from '../modals/privacy-policy/privacy-policy';

import { ContactModal } from '../modals/contact-modal/contact-modal';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']  // هنا كان خطأ: styleUrl يجب أن تكون styleUrls
})
export class Footer {
  faFacebookF = faFacebookF;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faWhatsapp = faWhatsapp;
  faMapMarkerAlt = faMapMarkerAlt;
  constructor(private dialog:MatDialog){

  }
  openPrivacyPolicy() {
  this.dialog.open(PrivacyPolicyComponent), {
    width: '600px',
  };
}


  

  openContact() {
    this.dialog.open(ContactModal, {
      width: '600px',
    });
  }
}

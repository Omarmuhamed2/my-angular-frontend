import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select } from './select/select';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Spinner } from './spinner/spinner';
import { RouterModule } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { Error } from './error/error';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { PrivacyPolicyComponent } from './modals/privacy-policy/privacy-policy';
import { MatButtonModule } from '@angular/material/button';
import { ContactModal } from './modals/contact-modal/contact-modal';




@NgModule({
  declarations: [
    Select,
    Header,
    Footer,
    Spinner,
    Home,
    Contact,
    Error,
    PrivacyPolicyComponent,
    ContactModal
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
      MatDialogModule,
      MatButtonModule,

  ],
  exports: [
    Select,
    Header,
    Footer,
    Spinner
  ]
})
export class SharedModule { }

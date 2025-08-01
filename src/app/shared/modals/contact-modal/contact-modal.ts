import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-contact-modal',
  standalone: false,
  templateUrl: './contact-modal.html',
  styleUrl: './contact-modal.css'
})
export class ContactModal {
constructor(private dialogRef:MatDialogRef<ContactModal>){

}
close() {
    this.dialogRef.close();
  }
}

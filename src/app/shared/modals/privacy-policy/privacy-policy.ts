import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-privacy-policy',
  standalone: false,
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.css'
})
export class PrivacyPolicyComponent {
  constructor(private dialogRef: MatDialogRef<PrivacyPolicyComponent>) {}

  close() {
    this.dialogRef.close();
  }
}

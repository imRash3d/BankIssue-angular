import { Component, Input, OnInit } from '@angular/core';

import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }


  ngOnInit(): void {
  }
  cancel() {
    this.dialogRef.close(false)
  }
  submit() {
    this.dialogRef.close(true)
  }
}
function MD_DIALOG_DATA(MD_DIALOG_DATA: any) {
  throw new Error('Function not implemented.');
}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  exports:[
    ConfirmDialogComponent,
    MatDialogModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DndDirective } from './directives/dnd.directives';
import { SafeHtml } from './pipes/safeHtml.pipe';


@NgModule({
  declarations: [ConfirmDialogComponent, FileUploadComponent,DndDirective,SafeHtml],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    
  ],
  exports:[
    ConfirmDialogComponent,
    MatDialogModule,
    FileUploadComponent,
    DndDirective,
    SafeHtml
  ]
})
export class SharedModule { }

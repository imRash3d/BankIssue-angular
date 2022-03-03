import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppIssueListComponent } from './app-issue-list/app-issue-list.component';
import { AppIssueCreatePhase1Component } from './app-issue-create-phase1/app-issue-create-phase1.component';
import { AppAddProblemComponent } from './app-add-problem/app-add-problem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    AppIssueListComponent,
    AppIssueCreatePhase1Component,
    AppAddProblemComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule ,
    MatNativeDateModule,
    MatSelectModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

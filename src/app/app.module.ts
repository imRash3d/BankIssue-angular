import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppIssueListComponent } from './app-issue-list/app-issue-list.component';
import { AppIssueCreatePhase1Component } from './app-issue-create-phase1/app-issue-create-phase1.component';

@NgModule({
  declarations: [
    AppComponent,
    AppIssueListComponent,
    AppIssueCreatePhase1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

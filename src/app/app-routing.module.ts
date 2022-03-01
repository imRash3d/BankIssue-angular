import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppIssueListComponent } from './app-issue-list/app-issue-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: AppIssueListComponent
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAddProblemComponent } from './app-add-problem/app-add-problem.component';
import { AppIssueListComponent } from './app-issue-list/app-issue-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: AppIssueListComponent
  },
  {
    path: 'add',
    component: AppAddProblemComponent
  },
  {
    path: '**',
    redirectTo: 'add'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-issue-list',
  templateUrl: './app-issue-list.component.html',
  styleUrls: ['./app-issue-list.component.scss']
})
export class AppIssueListComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  addProblem(){
    this.router.navigateByUrl('/add')
  }
  editProblem(){
    this.router.navigateByUrl('/edit/1')
  }

}

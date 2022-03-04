import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankProblemService } from '../@services/bank-problem.service';

@Component({
  selector: 'app-app-issue-list',
  templateUrl: './app-issue-list.component.html',
  styleUrls: ['./app-issue-list.component.scss']
})
export class AppIssueListComponent implements OnInit {
  problems = []
    ; constructor(
      private bankProblemService: BankProblemService,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.bankProblemService.getProblems().subscribe(_problems => {
      this.problems = _problems;
    })
  }

  addProblem() {
    this.router.navigateByUrl('/add')
  }
  editProblem() {
    this.router.navigateByUrl('/edit/1')
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BankProblemService } from '../@services/bank-problem.service';
import { CommonService } from '../@services/common.service';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-app-issue-list',
  templateUrl: './app-issue-list.component.html',
  styleUrls: ['./app-issue-list.component.scss']
})
export class AppIssueListComponent implements OnInit {
  problems = [];
  constructor(
    private dialog: MatDialog,
    private bankProblemService: BankProblemService,
    private router: Router,
    private commonsService: CommonService
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

  deleteitem(problem) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { title: 'Confirm Delete', subtitle: 'Are you sure want to delete?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bankProblemService.deelteProblem(problem).subscribe((res: any) => {
          console.log(res)
          if (res.Success) {
            this.problems = this.problems.filter(x => x.Id !== problem.Id);
            this.commonsService.showMessage('Item deleted successfully')
          }
        })
      }
      // console.log('The dialog was closed');

    });
  }


}

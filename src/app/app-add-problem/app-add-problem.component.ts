import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-add-problem',
  templateUrl: './app-add-problem.component.html',
  styleUrls: ['./app-add-problem.component.scss']
})
export class AppAddProblemComponent implements OnInit {

  showAddForm= true;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  cancel(){
    this.router.navigateByUrl('/list')
  }
  nextPhase(){
    this.showAddForm = false
  }
}

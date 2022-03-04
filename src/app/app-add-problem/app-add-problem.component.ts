import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfig } from '../@app-config/app-config.constant';
import { BankProblemService } from '../@services/bank-problem.service';
import { CommonService } from '../@services/common.service';

@Component({
  selector: 'app-app-add-problem',
  templateUrl: './app-add-problem.component.html',
  styleUrls: ['./app-add-problem.component.scss']
})
export class AppAddProblemComponent implements OnInit {
  createProblem: FormGroup = this.initForm()
  showAddForm = true;
  issueTypes = AppConfig.ISSUE_TYPE;
  departmentCodes = AppConfig.DEPARTMENT_CODE;
  tags = AppConfig.ISSUE_TYPE.filter(x => x !== AppConfig.BOTH);
  catagories = AppConfig.CATEGORY
  families = AppConfig.FAMILTY

  familyDivison = {
    insurance: [],
    claim: []
  };

  agents = [];
 departments = [];
  constructor(
    private bankProblemService: BankProblemService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initForm()
  }

  initForm(data?: any) {
    console.log(this.initIssue())
    return this.createProblem = this.fb.group({
      Title: [data && data.Title || '', [Validators.required]],
      Comments: [data && data.Comments || '', [Validators.required]],
      Text: [data && data.Text || '', [Validators.required]],
      //  Site: [data && data.Site || '', [Validators.required]],
      Department: [data && data.Department || '', [Validators.required]],
      DepartmentCode: [data && data.DepartmentCode || '', [Validators.required]],
      Tags: [data && data.Tags || '', [Validators.required]],
      ProblemLeadName: [data && data.ProblemLeadName || '', [Validators.required]],
      ProblemLeadEmail: [data && data.ProblemLeadEmail || '', [Validators.required]],
      ExternalLink: [data && data.ExternalLink || 'test'],
      FromWhen: [data && data.FromWhen || '', [Validators.required]],
      ToWhen: [data && data.ToWhen || '', [Validators.required]],
      IsAnlysisRequired: [data && data.IsAnlysisRequired || false, [Validators.required]],
      Claim: data && data.Claim && this.initIssue(data.Claim) || this.initIssue(),
      Insurance: data && data.Insurance && this.initIssue(data.Insurance) || this.initIssue(),
      Agents: [data && data.Agents || '', [Validators.required]],
      IssueType: ['', [Validators.required]],
      ShowCliam: [false],
      ShowInsurance: [false],
      Site: ['test']


    })

  }

  initIssue(data?: any) {
    return this.fb.group({
      Code: [data && data.Code || ''],
      Family: [data && data.Family || ''],
      FamilyDivision: [data && data.FamilyDivision || ''],
      Category: [data && data.Category || null],
    })
  }

  submitForm() {

    if (this.createProblem.invalid) {
      this.commonService.showMessage('Required filed missing');
      return;
    }


    console.log(this.createProblem.value);
    let model = this.createProblem.value;

    model['Claim'] = model.ShowCliam ? model['Claim'] : null;
    model['Insurance'] = model.ShowCliam ? model['Insurance'] : null;
    model['ToWhen']= new Date( model['ToWhen']).toISOString();
    model['FromWhen']= new Date( model['FromWhen']).toISOString();
    this.bankProblemService.createProblem(this.createProblem.value).subscribe(res => {
      console.log(res)
    })
  }
  ngOnInit(): void {

    this.getAgents();
    this.getDepartments();



    this.createProblem.get('IssueType').valueChanges.subscribe(_value => {  // manage claim / insurance 
      const showClaim = [AppConfig.CLIAM, AppConfig.BOTH].includes(_value);
      const ShowInsurance = [AppConfig.INSURANCE, AppConfig.BOTH].includes(_value);

      const cliamControl = this.createProblem.get('Claim');
      const insuranceControl = this.createProblem.get('Insurance');

      this.createProblem.get('ShowCliam')?.setValue(showClaim);
      this.createProblem.get('ShowInsurance')?.setValue(ShowInsurance);

      console.log(showClaim, ShowInsurance)
      if (showClaim) {
        this.initIssueValidators(cliamControl, [Validators.required])
      } else {
        this.initIssueValidators(cliamControl, null)
      }
      if (ShowInsurance) {
        this.initIssueValidators(insuranceControl, [Validators.required])
      } else {
        this.initIssueValidators(insuranceControl, null)

      }

    })





  }


  getAgents() {
    this.bankProblemService.getAgents().subscribe(_agents => {
      this.agents = _agents;
    })
  }
  getDepartments() {
    this.bankProblemService.getDepartments().subscribe(_res => {
      this.departments = _res;
    })
  }

  initIssueValidators(control, _validators) {
    console.log(control, control.controls)
    control.controls['Code'].setValidators(_validators)
    control.controls['Code'].updateValueAndValidity();

    control.controls['Family'].setValidators(_validators);
    control.controls['Family'].updateValueAndValidity();

    control.controls['FamilyDivision'].setValidators(_validators);
    control.controls['FamilyDivision'].updateValueAndValidity();

    control.controls['Category'].setValidators(_validators);
    control.controls['Category'].updateValueAndValidity();

  }

  onSelectFamily(e: any, type: any) {


    const fdivision = AppConfig.FAMILTY_DIVISION[String(e).toUpperCase()]
    this.familyDivison[type] = fdivision;
  }
  cancel() {
    this.router.navigateByUrl('/list')
  }
  nextPhase() {
    this.showAddForm = false
  }
  backToForm() {
    this.showAddForm = true
  }
}

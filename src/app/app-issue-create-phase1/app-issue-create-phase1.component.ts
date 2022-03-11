import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConfig } from '../@app-config/app-config.constant';
import { BankProblemService } from '../@services/bank-problem.service';

@Component({
  selector: 'app-issue-create-phase1',
  templateUrl: './app-issue-create-phase1.component.html',
  styleUrls: ['./app-issue-create-phase1.component.scss']
})
export class AppIssueCreatePhase1Component implements OnInit {
  @Input() departments = [];
  departmentCodes = AppConfig.DEPARTMENT_CODE;
  issueTypes = AppConfig.ISSUE_TYPE;
  tags = AppConfig.ISSUE_TYPE.filter(x => x !== AppConfig.BOTH);
  catagories = AppConfig.CATEGORY
  families = AppConfig.FAMILTY
  @Input() agents = [];
  familyDivison = {
    insurance: [],
    claim: []
  };
  editMode = false;

  @Output() onBackEmit = new EventEmitter();
  phaseForm: FormGroup;
  constructor(
    private bankProblemService:BankProblemService,
    private fb: FormBuilder
  ) {   this.initPhaseForm();}

  ngOnInit(): void {

  


    
    this.phaseForm.get('IssueType').valueChanges.subscribe(_value => {  // manage claim / insurance 
      const showClaim = [AppConfig.CLIAM, AppConfig.BOTH].includes(_value);
      const ShowInsurance = [AppConfig.INSURANCE, AppConfig.BOTH].includes(_value);

      const cliamControl = this.phaseForm.get('Claim');
      const insuranceControl = this.phaseForm.get('Insurance');

      this.phaseForm.get('ShowCliam')?.setValue(showClaim);
      this.phaseForm.get('ShowInsurance')?.setValue(ShowInsurance);

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

  initPhaseForm(data?) {
    return this.phaseForm = this.fb.group({
      Title: [data && data.Title || '', [Validators.required]],
      BusinessImpact: [data && data.Title || '', [Validators.required]],
      Comments: [data && data.Comments || '', [Validators.required]],
      Text: [data && data.Text || '', [Validators.required]],
      //  Site: [data && data.Site || '', [Validators.required]],
      Department: [data && data.Department && this.getMatchedDepartmens(data.Department) || '', [Validators.required]],
      DepartmentCode: [data && data.DepartmentCode || '', [Validators.required]],
      Tags: [data && data.Tags || '', [Validators.required]],
      ProblemLeadName: [data && data.ProblemLeadName || '', [Validators.required]],
      ProblemLeadEmail: [data && data.ProblemLeadEmail || '', [Validators.required, Validators.email]],
      ExternalLink: [data && data.ExternalLink || 'test'],
      Claim: data && data.Claim && this.initIssue(data.Claim, 'claim') || this.initIssue(),
      Insurance: data && data.Insurance && this.initIssue(data.Insurance, 'insurance') || this.initIssue(),
      Agents: [data && data.Agents && this.getMatchedAgents(data.Agents) || '', [Validators.required]],
      IssueType: [data && data.Tags && this.getIssueType(data.Tags) || '', [Validators.required]],
      ShowCliam: [data && data.Claim ? true : false],
      ShowInsurance: [data && data.Insurance ? true : false],
      IsApproved: [data && data.IsApproved || false]

    })
  }

  submit(){
    console.log(this.phaseForm.value)
  }

  private getIssueType(_tags: Array<string>): string {
    let _issueType = '';
    if (_tags && _tags.length > 1) {
      _issueType = AppConfig.BOTH
    }
    else if (_tags.includes(AppConfig.CLIAM)) {
      _issueType = AppConfig.CLIAM
    } else {
      _issueType = AppConfig.INSURANCE
    }

    return _issueType;
  }

  private getMtchFamilyDivision(_family, _type, _fdivison) {

    const fdivision = AppConfig.FAMILTY_DIVISION[String(_family).toUpperCase()]
    this.familyDivison[_type] = fdivision;
    console.log(this.familyDivison)
    return _fdivison;
  }

  initIssue(data?: any, type?: string) {
    return this.fb.group({
      Id: [data && data.Id && this.editMode && data.Id || null],
      Code: [data && data.Code || ''],
      Family: [data && data.Family || ''],
      FamilyDivision: [data && data.FamilyDivision && this.getMtchFamilyDivision(data.Family, type, data.FamilyDivision) || ''],
      Category: [data && data.Category || null],
    })
  }
  private getMatchedDepartmens(_departments) {
    const dept = this.departments.find(x => x.Id == _departments.Id);
    return dept;
  }
  private getMatchedAgents(_agents) {
    const agIds: Array<number> = _agents.map(x => x.Id);

    const agnts = this.agents.filter(x => agIds.includes(x.Id));
    return agnts;
  }
  backToForm() {
    this.onBackEmit.emit(true)
  }

  onSelectFamily(e: any, type: any) {
    this.familyDivison[type] = this.bankProblemService.onSelectFamily(e)
  }
}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AppConfig } from '../@app-config/app-config.constant';
import { BankProblemService } from '../@services/bank-problem.service';
import { CommonService } from '../@services/common.service';

@Component({
  selector: 'app-issue-create-phase',
  templateUrl: './app-issue-create-phase.component.html',
  styleUrls: ['./app-issue-create-phase.component.scss']
})
export class AppIssueCreatePhaseComponent implements OnInit, OnChanges {
  @Input() departments = [];
  departmentCodes = AppConfig.DEPARTMENT_CODE;
  issueTypes = AppConfig.ISSUE_TYPE;
  tags = AppConfig.ISSUE_TYPE.filter(x => x !== AppConfig.BOTH);
  catagories = AppConfig.CATEGORY
  families = AppConfig.FAMILTY
  @Input() agents = [];
  @Input() problemId;
  familyDivison = {
    insurance: [],
    claim: []
  };
  editMode = false;
  phaseId: string;
  @Output() onBackEmit = new EventEmitter();
  phaseForm: FormGroup;
  constructor(
    private bankProblemService: BankProblemService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private router: Router
  ) {




  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.problemId) {
      this.bankProblemService.getPhase(this.problemId).subscribe(res => {
        console.log(res)
        if (res) {
          this.editMode = true;
          this.phaseId = res.Id;
          this.initPhaseForm(res)
        }
      })
    }
  }
  ngOnInit(): void {




    //  console.log(this.problemId)


    this.initPhaseForm();  // init phase form 


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

  add(c) {
    console.log(c)
    this.stakeholderControl.push(this.initStakeholder());
  }


  get stakeholderControl() {
    return this.phaseForm.get("Stakeholders") as FormArray;
  }


  initPhaseForm(data?) {
    return this.phaseForm = this.fb.group({
      ProblemId: [this.problemId, [Validators.required]],
      Title: [data && data.Title || '', [Validators.required]],
      BusinessImpact: [data && data.Title || '', [Validators.required]],
      Department: [data && data.Department && this.getMatchedDepartmens(data.Department) || '', [Validators.required]],
      DepartmentCode: [data && data.DepartmentCode || '', [Validators.required]],
      Tags: [data && data.Tags || '', [Validators.required]],
      ProblemLeadName: [data && data.ProblemLeadName || '', [Validators.required]],
      ProblemLeadEmail: [data && data.ProblemLeadEmail || '', [Validators.required, Validators.email]],
      Claim: data && data.Claim && this.initIssue(data.Claim, 'claim') || this.initIssue(),
      Insurance: data && data.Insurance && this.initIssue(data.Insurance, 'insurance') || this.initIssue(),
      Agents: [data && data.Agents && this.getMatchedAgents(data.Agents) || '', [Validators.required]],
      IssueType: [data && data.Tags && this.getIssueType(data.Tags) || '', [Validators.required]],
      ShowCliam: [data && data.Claim ? true : false],
      ShowInsurance: [data && data.Insurance ? true : false],
      IsApproved: [data && data.IsApproved || false],
      Files: [data && data.Files || null],
      Stakeholders: this.fb.array(data && data.Stakeholders.map(x => this.initStakeholder(x)) || [this.initStakeholder()])
    })
  }



  initStakeholder(data?) {
    return this.fb.group({
      Id: [data && data.Id && this.editMode && data.Id || null],
      Email: [data && data.Email || '', [Validators.required, Validators.email]],
      Name: [data && data.Name || '', [Validators.required]],
      Department: [data && data.Department || null, [Validators.required]],
    })
  }
  submit() {

    if (this.phaseForm.invalid) {
      this.commonService.showMessage('Required filed missing');
      return;
    }
    if (!this.phaseForm.get('Files').value) {
      this.commonService.showMessage('file missing');
      return;
    }



    let model = Object.assign({}, this.phaseForm.value);

    model['Claim'] = model.ShowCliam ? model['Claim'] : null;
    model['Insurance'] = model.ShowInsurance ? model['Insurance'] : null;
    model['ProblemId'] = Number(this.problemId);

    if (this.editMode) {
      this.removeIdProps(model);
      model['Id'] = Number(this.phaseId);
    } else {
      if (model['Claim']) delete model['Claim']['Id'];
      if (model['Insurance']) delete model['Insurance']['Id'];
      this.removeIdProps(model);
    }


    console.log(model);


    let obs: Observable<any>;
    obs = this.editMode ? this.bankProblemService.editProblemPhase(model) : this.bankProblemService.createProblemPhase(model);

    obs.subscribe((res: any) => {
      console.log(res)
      if (res.Success) {
        /// message 

        const mgs = this.editMode ? 'Phse updated successfully' : 'Phase added successfully '
        this.commonService.showMessage(mgs);

        setTimeout(() => {
          this.router.navigateByUrl('/list')
        }, 1000)


      }
    })


  }

  removeIdProps(model) {

    if (model['Stakeholders'] && model['Stakeholders'].length) {
      model['Stakeholders'].forEach(_i => {
        if (!_i['Id']) {
          delete _i['Id']
        }

      })
    }
  }


  onFileUplaod(_res) {
    this.phaseForm.get('Files').setValue(_res);
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfig } from '../@app-config/app-config.constant';
import { BankProblemService } from '../@services/bank-problem.service';
import { CommonService } from '../@services/common.service';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';

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
  problemId: string;
  editMode = false;
  constructor(
    private dialog: MatDialog,
    private bankProblemService: BankProblemService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm()
  }

  initForm(data?: any) {

    return this.createProblem = this.fb.group({
      Title: [data && data.Title || '', [Validators.required]],
      Comments: [data && data.Comments || '', [Validators.required]],
      Text: [data && data.Text || '', [Validators.required]],
      //  Site: [data && data.Site || '', [Validators.required]],
      Department: [data && data.Department && this.getMatchedDepartmens(data.Department) || '', [Validators.required]],
      DepartmentCode: [data && data.DepartmentCode || '', [Validators.required]],
      Tags: [data && data.Tags || '', [Validators.required]],
      ProblemLeadName: [data && data.ProblemLeadName || '', [Validators.required]],
      ProblemLeadEmail: [data && data.ProblemLeadEmail || '', [Validators.required, Validators.email]],
      ExternalLink: [data && data.ExternalLink || 'test'],
      FromWhen: [data && data.FromWhen && new Date(data.FromWhen) || '', [Validators.required]],
      ToWhen: [data && data.ToWhen && new Date(data.ToWhen) || '', [Validators.required]],
      IsAnlysisRequired: [data && data.IsAnlysisRequired || false, [Validators.required]],
      Claim: data && data.Claim && this.initIssue(data.Claim,'claim') || this.initIssue(),
      Insurance: data && data.Insurance && this.initIssue(data.Insurance,'insurance') || this.initIssue(),
      Agents: [data && data.Agents && this.getMatchedAgents(data.Agents) || '', [Validators.required]],
      IssueType: [data && data.Tags && this.getIssueType(data.Tags) || '', [Validators.required]],
      ShowCliam: [data && data.Claim? true : false],
      ShowInsurance: [data && data.Insurance?true : false],
      Site: ['test'],
      FileName:  [data && data.FileName || ''],
      Files:  [data && data.Files || null],
      IsApproved:[data && data.IsApproved || false]
      

    })

  }

  onFileUplaod(_res){
    this.createProblem.get('Files').setValue(_res);
  }

  approvedItem(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { title: 'Confirm Approved', subtitle: 'Are you sure want to approved?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const model = {
          Id: this.problemId,
          IsApproved: true
        }
        this.bankProblemService.approvedProblem(model).subscribe((res: any) => {
          console.log(res)
          if (res.Success) {
            this.createProblem.get('IsApproved').setValue(true);
            
          }
        })
      }
      // console.log('The dialog was closed');

    });
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


  private getMatchedDepartmens(_departments) {

    const dept = this.departments.find(x => x.Id == _departments.Id);
    console.log(_departments , dept)
    return dept;
  }
  private getMatchedAgents(_agents) {
    const agIds:Array<number> = _agents.map(x=>x.Id);

    const agnts = this.agents.filter(x => agIds.includes(x.Id));
    return agnts;
  }

  initIssue(data?: any,type?:string) {
    return this.fb.group({
      Id:[data && data.Id && this.editMode && data.Id || null],
      Code: [data && data.Code || ''],
      Family: [data && data.Family || ''],
      FamilyDivision: [data && data.FamilyDivision && this.getMtchFamilyDivision(data.Family,type,data.FamilyDivision) || ''],
      Category: [data && data.Category || null],
    })
  }



  private getMtchFamilyDivision(_family,_type,_fdivison){
    
    const fdivision = AppConfig.FAMILTY_DIVISION[String(_family).toUpperCase()]
    this.familyDivison[_type] = fdivision;
    console.log(this.familyDivison)
    return _fdivison;
  }

  submitForm() {




    if (this.createProblem.invalid) {
      this.commonService.showMessage('Required filed missing');
      return;
    }
    if (!this.createProblem.get('Files').value) {
      this.commonService.showMessage('file missing');
      return;
    }


    console.log(this.createProblem.value);
    let model = Object.assign({}, this.createProblem.value);

    model['Claim'] = model.ShowCliam ? model['Claim'] : null;
    model['Insurance'] = model.ShowInsurance ? model['Insurance'] : null;
    model['ToWhen'] = new Date(model['ToWhen']).toISOString();
    model['FromWhen'] = new Date(model['FromWhen']).toISOString();


    if(this.editMode){
      model['Id'] = Number(this.problemId);
    }else {
      if(   model['Claim']) delete    model['Claim']['Id'];
      if(   model['Insurance']) delete    model['Insurance']['Id'];
    }

    



    let obs: Observable<any>;
    obs = this.editMode ? this.bankProblemService.editProblem(model) : this.bankProblemService.createProblem(model);

    obs.subscribe((res: any) => {
      console.log(res)
      if (res.Success) {
        
        const mgs = this.editMode ? 'Problem updated successfully' : 'Problem added successfully '
        this.commonService.showMessage(mgs);

        setTimeout(() => {
          this.router.navigateByUrl('/list')
        }, 1000)
      }
    })
  }
  ngOnInit(): void {

    this.getAgents();
    this.getDepartments();



    //edit route 

    if (this.route.snapshot.params && this.route.snapshot.params.id) {
      this.bankProblemService.getProblem(this.route.snapshot.params.id).subscribe(response => {

        this.editMode = true;
        this.problemId = this.route.snapshot.params.id;
        this.initForm(response);
        console.log(response)
        console.log(this.createProblem.value);
      })
    }








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
    this.familyDivison[type] = this.bankProblemService.onSelectFamily(e)
  }
  cancel() {
    this.router.navigateByUrl('/list')
  }
  nextPhase() {
    this.showAddForm = false
  }
  backToForm(value) {
    this.showAddForm = value;
  }
}

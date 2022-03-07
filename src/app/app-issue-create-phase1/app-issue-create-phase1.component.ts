import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConfig } from '../@app-config/app-config.constant';

@Component({
  selector: 'app-issue-create-phase1',
  templateUrl: './app-issue-create-phase1.component.html',
  styleUrls: ['./app-issue-create-phase1.component.scss']
})
export class AppIssueCreatePhase1Component implements OnInit {
  @Input() departments = [];
  @Input() agents = [];
  familyDivison = {
    insurance: [],
    claim: []
  };
  editMode = false;

  @Output() onBackEmit = new EventEmitter();
  phaseForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  initPhaseForm(data?) {
    return this.phaseForm = this.fb.group({
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
      Claim: data && data.Claim && this.initIssue(data.Claim, 'claim') || this.initIssue(),
      Insurance: data && data.Insurance && this.initIssue(data.Insurance, 'insurance') || this.initIssue(),
      Agents: [data && data.Agents && this.getMatchedAgents(data.Agents) || '', [Validators.required]],
      IssueType: [data && data.Tags && this.getIssueType(data.Tags) || '', [Validators.required]],
      ShowCliam: [data && data.Claim ? true : false],
      ShowInsurance: [data && data.Insurance ? true : false],
      Site: ['test'],
      IsApproved: [data && data.IsApproved || false]

    })
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
}

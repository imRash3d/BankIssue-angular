import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppIssueCreatePhase1Component } from './app-issue-create-phase1.component';

describe('AppIssueCreatePhase1Component', () => {
  let component: AppIssueCreatePhase1Component;
  let fixture: ComponentFixture<AppIssueCreatePhase1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppIssueCreatePhase1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppIssueCreatePhase1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

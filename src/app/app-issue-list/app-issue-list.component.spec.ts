import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppIssueListComponent } from './app-issue-list.component';

describe('AppIssueListComponent', () => {
  let component: AppIssueListComponent;
  let fixture: ComponentFixture<AppIssueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppIssueListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppIssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

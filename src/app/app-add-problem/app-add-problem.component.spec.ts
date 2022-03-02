import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAddProblemComponent } from './app-add-problem.component';

describe('AppAddProblemComponent', () => {
  let component: AppAddProblemComponent;
  let fixture: ComponentFixture<AppAddProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAddProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAddProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

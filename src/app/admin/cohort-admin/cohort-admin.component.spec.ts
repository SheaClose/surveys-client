import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortAdminComponent } from './cohort-admin.component';

describe('CohortAdminComponent', () => {
  let component: CohortAdminComponent;
  let fixture: ComponentFixture<CohortAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CohortAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

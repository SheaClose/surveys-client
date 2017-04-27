import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCrudComponent } from './question-crud.component';

describe('QuestionCrudComponent', () => {
  let component: QuestionCrudComponent;
  let fixture: ComponentFixture<QuestionCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

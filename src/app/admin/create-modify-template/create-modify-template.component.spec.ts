import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModifyTemplateComponent } from './create-modify-template.component';

describe('CreateModifyTemplateComponent', () => {
  let component: CreateModifyTemplateComponent;
  let fixture: ComponentFixture<CreateModifyTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateModifyTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateModifyTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

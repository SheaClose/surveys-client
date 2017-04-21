import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakesurveyComponent } from './takesurvey.component';

describe('TakesurveyComponent', () => {
  let component: TakesurveyComponent;
  let fixture: ComponentFixture<TakesurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakesurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakesurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

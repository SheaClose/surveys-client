import { TestBed, inject } from '@angular/core/testing';

import { TakeSurveyServiceService } from './take-survey-service.service';

describe('TakeSurveyServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TakeSurveyServiceService]
    });
  });

  it('should ...', inject([TakeSurveyServiceService], (service: TakeSurveyServiceService) => {
    expect(service).toBeTruthy();
  }));
});

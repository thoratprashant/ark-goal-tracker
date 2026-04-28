import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictPerformanceSummary } from './district-performance-summary';

describe('DistrictPerformanceSummary', () => {
  let component: DistrictPerformanceSummary;
  let fixture: ComponentFixture<DistrictPerformanceSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictPerformanceSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictPerformanceSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

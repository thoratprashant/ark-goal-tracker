import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticBreakdown } from './diagnostic-breakdown';

describe('DiagnosticBreakdown', () => {
  let component: DiagnosticBreakdown;
  let fixture: ComponentFixture<DiagnosticBreakdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticBreakdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticBreakdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

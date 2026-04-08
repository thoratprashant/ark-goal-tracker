import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDrillDown } from './subject-drill-down';

describe('SubjectDrillDown', () => {
  let component: SubjectDrillDown;
  let fixture: ComponentFixture<SubjectDrillDown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectDrillDown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectDrillDown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

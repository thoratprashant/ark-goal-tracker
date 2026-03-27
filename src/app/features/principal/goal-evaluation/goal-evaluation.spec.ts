import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalEvaluation } from './goal-evaluation';

describe('GoalEvaluation', () => {
  let component: GoalEvaluation;
  let fixture: ComponentFixture<GoalEvaluation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalEvaluation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalEvaluation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

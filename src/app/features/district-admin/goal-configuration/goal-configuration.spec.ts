import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalConfiguration } from './goal-configuration';

describe('GoalConfiguration', () => {
  let component: GoalConfiguration;
  let fixture: ComponentFixture<GoalConfiguration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalConfiguration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalConfiguration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

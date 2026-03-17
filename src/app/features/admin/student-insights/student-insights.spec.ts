import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInsights } from './student-insights';

describe('StudentInsights', () => {
  let component: StudentInsights;
  let fixture: ComponentFixture<StudentInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInsights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInsights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

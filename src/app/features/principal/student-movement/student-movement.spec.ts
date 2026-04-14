import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMovement } from './student-movement';

describe('StudentMovement', () => {
  let component: StudentMovement;
  let fixture: ComponentFixture<StudentMovement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMovement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMovement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

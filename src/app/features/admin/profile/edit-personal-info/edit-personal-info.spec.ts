import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonalInfo } from './edit-personal-info';

describe('EditPersonalInfo', () => {
  let component: EditPersonalInfo;
  let fixture: ComponentFixture<EditPersonalInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPersonalInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPersonalInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

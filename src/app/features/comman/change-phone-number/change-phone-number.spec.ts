import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhoneNumber } from './change-phone-number';

describe('ChangePhoneNumber', () => {
  let component: ChangePhoneNumber;
  let fixture: ComponentFixture<ChangePhoneNumber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePhoneNumber]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePhoneNumber);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

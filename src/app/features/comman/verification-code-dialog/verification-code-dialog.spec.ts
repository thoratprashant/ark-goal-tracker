import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationCodeDialog } from './verification-code-dialog';

describe('VerificationCodeDialog', () => {
  let component: VerificationCodeDialog;
  let fixture: ComponentFixture<VerificationCodeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationCodeDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationCodeDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

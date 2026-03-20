import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionManagement } from './permission-management';

describe('PermissionManagement', () => {
  let component: PermissionManagement;
  let fixture: ComponentFixture<PermissionManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

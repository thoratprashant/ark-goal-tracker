import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagmentListing } from './user-managment-listing';

describe('UserManagmentListing', () => {
  let component: UserManagmentListing;
  let fixture: ComponentFixture<UserManagmentListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagmentListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagmentListing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

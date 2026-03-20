import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataImportManagement } from './data-import-management';

describe('DataImportManagement', () => {
  let component: DataImportManagement;
  let fixture: ComponentFixture<DataImportManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataImportManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataImportManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

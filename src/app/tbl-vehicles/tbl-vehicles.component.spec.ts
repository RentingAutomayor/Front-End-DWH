import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblVehiclesComponent } from './tbl-vehicles.component';

describe('TblVehiclesComponent', () => {
  let component: TblVehiclesComponent;
  let fixture: ComponentFixture<TblVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

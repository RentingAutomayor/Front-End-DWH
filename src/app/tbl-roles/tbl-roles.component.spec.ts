import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblRolesComponent } from './tbl-roles.component';

describe('TblRolesComponent', () => {
  let component: TblRolesComponent;
  let fixture: ComponentFixture<TblRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

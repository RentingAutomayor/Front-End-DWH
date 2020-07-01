import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblPermisssionByModuleComponent } from './tbl-permisssion-by-module.component';

describe('TblPermisssionByModuleComponent', () => {
  let component: TblPermisssionByModuleComponent;
  let fixture: ComponentFixture<TblPermisssionByModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblPermisssionByModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblPermisssionByModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblContractsComponent } from './tbl-contracts.component';

describe('TblContractsComponent', () => {
  let component: TblContractsComponent;
  let fixture: ComponentFixture<TblContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblClientsComponent } from './tbl-clients.component';

describe('TblClientsComponent', () => {
  let component: TblClientsComponent;
  let fixture: ComponentFixture<TblClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

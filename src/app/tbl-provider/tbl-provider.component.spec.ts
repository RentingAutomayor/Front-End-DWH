import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblProviderComponent } from './tbl-provider.component';

describe('TblProviderComponent', () => {
  let component: TblProviderComponent;
  let fixture: ComponentFixture<TblProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

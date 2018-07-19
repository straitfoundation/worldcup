import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexVipComponent } from './index-vip.component';

describe('IndexVipComponent', () => {
  let component: IndexVipComponent;
  let fixture: ComponentFixture<IndexVipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexVipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexVipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

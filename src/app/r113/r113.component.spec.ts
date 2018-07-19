import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { R113Component } from './r113.component';

describe('GameDrawComponent', () => {
  let component: R113Component;
  let fixture: ComponentFixture<R113Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ R113Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(R113Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

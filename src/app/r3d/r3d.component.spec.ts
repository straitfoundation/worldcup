import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { R3dComponent } from './r3d.component';

describe('R3dComponent', () => {
  let component: R3dComponent;
  let fixture: ComponentFixture<R3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ R3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(R3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

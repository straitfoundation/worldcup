import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { R3d_confirmComponent } from './r3d_confirm.component';

describe('GameDrawConfirmComponent', () => {
  let component: R3d_confirmComponent;
  let fixture: ComponentFixture<R3d_confirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ R3d_confirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(R3d_confirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

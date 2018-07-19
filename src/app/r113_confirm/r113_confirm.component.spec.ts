import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { R113_confirmComponent } from './r113_confirm.component';

describe('GameDrawConfirmComponent', () => {
  let component: R113_confirmComponent;
  let fixture: ComponentFixture<R113_confirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ R113_confirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(R113_confirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Worldcup_confirmComponent } from './worldcup_confirm.component';

describe('GameDrawConfirmComponent', () => {
  let component: Worldcup_confirmComponent;
  let fixture: ComponentFixture<Worldcup_confirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Worldcup_confirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Worldcup_confirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

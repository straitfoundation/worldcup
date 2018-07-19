import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Worldcup_setresultComponent } from './worldcup_setresult.component';

describe('GameDrawConfirmComponent', () => {
  let component: Worldcup_setresultComponent;
  let fixture: ComponentFixture<Worldcup_setresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Worldcup_setresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Worldcup_setresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

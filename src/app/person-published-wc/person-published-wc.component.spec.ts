import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPublishedWcComponent } from './person-published-wc.component';

describe('PersonPublishedWcComponent', () => {
  let component: PersonPublishedWcComponent;
  let fixture: ComponentFixture<PersonPublishedWcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonPublishedWcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPublishedWcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

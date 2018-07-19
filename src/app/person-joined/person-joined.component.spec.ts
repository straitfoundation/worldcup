import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonJoinedComponent } from './person-joined.component';

describe('PersonPublishedComponent', () => {
  let component: PersonJoinedComponent;
  let fixture: ComponentFixture<PersonJoinedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonJoinedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonJoinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

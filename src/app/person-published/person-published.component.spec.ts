import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPublishedComponent } from './person-published.component';

describe('PersonPublishedComponent', () => {
  let component: PersonPublishedComponent;
  let fixture: ComponentFixture<PersonPublishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonPublishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

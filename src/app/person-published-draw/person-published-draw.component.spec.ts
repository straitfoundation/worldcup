import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPublishedDrawComponent } from './person-published-draw.component';

describe('PersonGameListDrawComponent', () => {
  let component: PersonPublishedDrawComponent;
  let fixture: ComponentFixture<PersonPublishedDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonPublishedDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPublishedDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

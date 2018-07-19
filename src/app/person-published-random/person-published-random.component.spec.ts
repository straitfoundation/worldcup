import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPublishedRandomComponent } from './person-published-random.component';

describe('PersonGameListDrawComponent', () => {
  let component: PersonPublishedRandomComponent;
  let fixture: ComponentFixture<PersonPublishedRandomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonPublishedRandomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPublishedRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonGameListComponent } from './person-game-list.component';

describe('PersonGameListDrawComponent', () => {
  let component: PersonGameListComponent;
  let fixture: ComponentFixture<PersonGameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonGameListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

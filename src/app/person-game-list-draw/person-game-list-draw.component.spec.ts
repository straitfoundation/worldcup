import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonGameListDrawComponent } from './person-game-list-draw.component';

describe('PersonGameListDrawComponent', () => {
  let component: PersonGameListDrawComponent;
  let fixture: ComponentFixture<PersonGameListDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonGameListDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonGameListDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

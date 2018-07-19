import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonGameListWcComponent } from './person-game-list-wc.component';

describe('PersonGameListDrawComponent', () => {
  let component: PersonGameListWcComponent;
  let fixture: ComponentFixture<PersonGameListWcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonGameListWcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonGameListWcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDrawConfirmComponent } from './game-draw-confirm.component';

describe('GameDrawConfirmComponent', () => {
  let component: GameDrawConfirmComponent;
  let fixture: ComponentFixture<GameDrawConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDrawConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDrawConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

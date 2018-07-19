import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDrawComponent } from './game-draw.component';

describe('GameDrawComponent', () => {
  let component: GameDrawComponent;
  let fixture: ComponentFixture<GameDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

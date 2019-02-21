import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyvideosComponent } from './myvideos.component';

describe('MyvideosComponent', () => {
  let component: MyvideosComponent;
  let fixture: ComponentFixture<MyvideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyvideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyvideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddyoutubevideosComponent } from './addyoutubevideos.component';

describe('AddyoutubevideosComponent', () => {
  let component: AddyoutubevideosComponent;
  let fixture: ComponentFixture<AddyoutubevideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddyoutubevideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddyoutubevideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

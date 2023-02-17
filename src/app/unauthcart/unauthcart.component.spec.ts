import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthcartComponent } from './unauthcart.component';

describe('UnauthcartComponent', () => {
  let component: UnauthcartComponent;
  let fixture: ComponentFixture<UnauthcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthcartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageGuestComponent } from './login-page-guest.component';

describe('LoginPageGuestComponent', () => {
  let component: LoginPageGuestComponent;
  let fixture: ComponentFixture<LoginPageGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageGuestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

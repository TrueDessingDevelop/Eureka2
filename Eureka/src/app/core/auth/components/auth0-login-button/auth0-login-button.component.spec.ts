import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth0LoginButtonComponent } from './auth0-login-button.component';

describe('Auth0LoginButtonComponent', () => {
  let component: Auth0LoginButtonComponent;
  let fixture: ComponentFixture<Auth0LoginButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth0LoginButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth0LoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

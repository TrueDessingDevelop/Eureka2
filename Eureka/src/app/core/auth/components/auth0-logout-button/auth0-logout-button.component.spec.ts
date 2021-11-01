import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth0LogoutButtonComponent } from './auth0-logout-button.component';

describe('Auth0LogoutButtonComponent', () => {
  let component: Auth0LogoutButtonComponent;
  let fixture: ComponentFixture<Auth0LogoutButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth0LogoutButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth0LogoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

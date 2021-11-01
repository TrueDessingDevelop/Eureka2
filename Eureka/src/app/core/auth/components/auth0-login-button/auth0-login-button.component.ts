import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'auth0-login-button',
  templateUrl: './auth0-login-button.component.html',
  styleUrls: ['./auth0-login-button.component.css']
})
export class Auth0LoginButtonComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}

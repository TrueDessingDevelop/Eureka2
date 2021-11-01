import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'auth0-logout-button',
  templateUrl: './auth0-logout-button.component.html',
  styleUrls: ['./auth0-logout-button.component.css']
})

export class Auth0LogoutButtonComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

  ngOnInit(): void {
  }

}

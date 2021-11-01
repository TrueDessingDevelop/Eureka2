import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'site-navbar',
  templateUrl: './site-navbar.component.html',
  styleUrls: ['./site-navbar.component.css']
})
export class SiteNavbarComponent implements OnInit {
  @Input()
  isLoged:any;
  constructor() { }

  ngOnInit(): void {
  }

}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLandingComponent } from './site-landing.component';

describe('SiteLandingComponent', () => {
  let component: SiteLandingComponent;
  let fixture: ComponentFixture<SiteLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

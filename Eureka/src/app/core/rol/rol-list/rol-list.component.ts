import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRolService } from '../services/api-rol.service';
@Component({
  selector: 'rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.css']
})
export class RolListComponent implements OnInit {
  Roles: any = [];

  constructor(private api: ApiRolService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.api.GetAll().subscribe(res => {
      this.Roles = res;
    });
  }

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Do you want to go ahead?')) {
      this.api.Delete(id).subscribe((res) => {
        this.Roles.splice(i, 1);
      })
    }
  }
 //Redirect To add permission
 new(){
  this.ngZone.run(() => this.router.navigateByUrl('dashboard/rol/add'))
}
}

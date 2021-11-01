import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRolService } from '../../rol/services/api-rol.service';
import { ApiPermissionService } from '../services/api-permission.service';

@Component({
  selector: 'permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent implements OnInit {

  permissions: any = [];
  roles: any = [];
  constructor(private apiRol:ApiRolService,
    private apiPermission: ApiPermissionService,  
    private router: Router,
    private ngZone: NgZone) { }

  //Load Roles, permissions and set it to display.
  ngOnInit(): void {
    this.apiRol.GetAll().subscribe(res => {
      this.roles = res;
      this.apiPermission.GetAll().subscribe(res => {
        this.permissions = res;
        this.isPermissionInRol();
     });
   });  
  }

  //check permissions for correct display in the html 
  isPermissionInRol(){
    let tmp :any = [];
    for(let i=0;i<this.permissions.length;i++){
      let roles = this.permissions[i].rol;
      for(let k = 0; k<this.roles.length;k++){
        for(let l=0;l<roles.length;l++){
            if(roles[l] == this.roles[k].name){   
              tmp[k] = [this.roles[k].name,"Concedido","concedido"];
              break;
            }else{
              tmp[k] = [this.roles[k].name,"Denegado","denegado"];    
            }
          }
      }      
      this.permissions[i].rol = tmp;
      tmp = [];
    }  
  }

  //Delete a permission from the db
  delete(id: any, i: any) {
    if (window.confirm('Do you want to go ahead?')) {
      this.apiPermission.Delete(id).subscribe((res) => {
        this.permissions.splice(i, 1);
      })
    }
  }

  //Lock the permission and save it in the db
  lock(id: any, i: any) {
    this.apiPermission.Update(id,{locked:true}).subscribe((res) => {
      this.apiPermission.Get(id).subscribe(res => {
        for(let i=0;i < this.permissions.length; i++){
          if(this.permissions[i]._id == res._id){
            this.permissions[i] = res;
          }
        }
     });
    })
  }

  //Unlock the permission and save it in the db
  unlock(id: any, i: any) {
    this.apiPermission.Update(id,{locked:false}).subscribe((res) => {
      this.apiPermission.Get(id).subscribe(res => {
        for(let i=0;i < this.permissions.length; i++){
          if(this.permissions[i]._id == res._id){
            this.permissions[i] = res;
          }
        }
     });
    })
  }

  //Redirect To add permission
  new(){
    this.ngZone.run(() => this.router.navigateByUrl('dashboard/permission/add'))
  }
}

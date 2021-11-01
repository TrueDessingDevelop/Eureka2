import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUserService } from '../services/api-user.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {  
  users: any = [];

  constructor(private apiUser:ApiUserService,  
    private router: Router,
    private ngZone: NgZone) { }

  //Load Roles, permissions and set it to display.
  ngOnInit(): void {
    this.apiUser.GetAll().subscribe(res => {
        this.users = res;
   });  
  }

  //check permissions for correct display in the html 
  

  //Delete a permission from the db
  delete(id: any, i: any) {
    if (window.confirm('Do you want to go ahead?')) {
      this.apiUser.Delete(id).subscribe((res) => {
        this.users.splice(i, 1);
      })
    }
  }

  //Lock the permission and save it in the db
  lock(id: any, i: any) {
    this.apiUser.Update(id,{locked:true}).subscribe((res) => {
      this.apiUser.Get(id).subscribe(res => {
        for(let i=0;i < this.users.length; i++){
          if(this.users[i]._id == res._id){
            this.users[i] = res;
          }
        }
     });
    })
  }

  //Unlock the permission and save it in the db
  unlock(id: any, i: any) {
    this.apiUser.Update(id,{locked:false}).subscribe((res) => {
      this.apiUser.Get(id).subscribe(res => {
        for(let i=0;i < this.users.length; i++){
          if(this.users[i]._id == res._id){
            this.users[i] = res;
          }
        }
     });
    })
  }

  //Redirect To add permission
  new(){
    this.ngZone.run(() => this.router.navigateByUrl('dashboard/user/add'))
  }
}

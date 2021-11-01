import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../model/user';
import { ApiUserService } from '../services/api-user.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isEdit:boolean = false;
  editMsg:string = "Edit";
  updateForm: FormGroup ;
  profile: User = new User;
  
  constructor(public auth: AuthService,private apiUser:ApiUserService,public formBuilder: FormBuilder) { 

    this.updateForm = this.formBuilder.group({
      _id:'',
      username: ''
    })
    this.profile = this.updateForm.value;
    console.log(this.profile);
  }
  
  edit(){
    this.isEdit = !this.isEdit
    this.isEdit ? this.editMsg = "Complete" : this.editMsg = "Edit";
    if(!this.isEdit){
      this.profile = this.updateForm.value;
      this.apiUser.Update(this.updateForm.controls._id.value, this.profile).subscribe(res=>{
        console.log(res);
      });
    }
  }
  onUpdate(){}

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.auth.user$.subscribe(user=>{
      this.apiUser.GetByEmail(user?.email).subscribe(user=>{
        this.updateForm.setValue({
          _id:user[0]._id,
          username:user[0].username
        });
        this.profile = user[0];
        
      });
    });
  }
}

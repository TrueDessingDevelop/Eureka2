import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiRolService } from '../../rol/services/api-rol.service';
import { ApiUserService } from '../services/api-user.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;
  Roles: any = [];
  newAccount:any ;
  msg:any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private apiUser: ApiUserService,
    private apiRol: ApiRolService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.newAccount = this.activatedRoute.snapshot.paramMap.get('new');
    this.updateForm = this.formBuilder.group({
      username: [''],
      email: [''],
      rol: []
    })
  }

  ngOnInit() { 
    this.apiRol.GetAll().subscribe(res => {
      this.Roles = res as FormArray;
      this.apiUser.Get(this.getId).subscribe(res => {
        console.log(res);
        this.updateForm.setValue({
          username: res['username'],
          email: res['email'],
          rol: res['rol']
        });
        this.checkRoles();
      });

    });

    if(this.newAccount){
      this.msg = "Fill u data before next for complete register user."
    }

  }

  checkRoles(){
    for(let i = 0 ; i< this.Roles.length; i++){
      for(let r = 0; r < this.Roles.length;r++){
        if(this.Roles[i].name == this.updateForm.controls.rol.value[r]){
          console.log(this.updateForm.controls.rol.value[r]);
          this.Roles[i].checked = true;
        }
      }
    }
  }

  onUpdate(): any {
    this.apiUser.Update(this.getId, this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard/user/list'))
      }, (err) => {
        console.log(err);
      });
  }
  
  onCheckboxChange(e:any) {
    if (e.target.checked) {
      this.updateForm.controls.rol.value.push(e.target.value);
    } else {
        for(let i = 0; i<this.updateForm.controls.rol.value.length;i++){
          if(this.updateForm.controls.rol.value[i] == e.target.value){
            var index = this.updateForm.controls.rol.value.indexOf(e.target.value);
            this.updateForm.controls.rol.value.splice(index,1);
          }
        } 
      };
    }
  }


import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiRolService } from '../../rol/services/api-rol.service';
import { ApiPermissionService } from '../services/api-permission.service';

@Component({
  selector: 'permission-detail',
  templateUrl: './permission-detail.component.html',
  styleUrls: ['./permission-detail.component.css']
})
export class PermissionDetailComponent implements OnInit {
  getId: any;
  fg: FormGroup;
  Roles: any = [];
  rol: any = [];
 
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private apiPermission: ApiPermissionService,
    private apiRol: ApiRolService,
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.fg = this.formBuilder.group({
      name: [''],
      description: [''],
      rol: this.rol
    })
  }

  ngOnInit() { 
    this.apiRol.GetAll().subscribe(res => {
      this.Roles = res as FormArray;
      this.apiPermission.Get(this.getId).subscribe(res => {
        this.fg.setValue({
          name: res['name'],
          description: res['description'],
          rol: res['rol']
        });
       
        this.checkRoles();
      });
    });
  }

  checkRoles(){
    for(let i = 0 ; i< this.Roles.length; i++){
      for(let r = 0; r < this.Roles.length;r++){
        if(this.Roles[i].name == this.fg.controls.rol.value[r]){
          this.Roles[i].checked = true;
        }
      }
    }
  }

  onUpdate(): any {
    this.apiPermission.Update(this.getId, this.fg.value)
      .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('dashboard/permission/list'))
      }, (err) => {
        console.log(err);
      });
  }


  onCheckboxChange(e:any) {
    if (e.target.checked) {
      this.fg.controls.rol.value.push(e.target.value);
    } else {
        for(let i = 0; i<this.fg.controls.rol.value.length;i++){
          if(this.fg.controls.rol.value[i] == e.target.value){
            var index = this.fg.controls.rol.value.indexOf(e.target.value);
            this.fg.controls.rol.value.splice(index,1);
          }
        } 
      };
    }
  }
  


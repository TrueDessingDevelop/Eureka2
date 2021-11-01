import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRolService } from '../../rol/services/api-rol.service';
import { ApiPermissionService } from '../services/api-permission.service';

@Component({
  selector: 'permission-add',
  templateUrl: './permission-add.component.html',
  styleUrls: ['./permission-add.component.css']
})
export class PermissionAddComponent implements OnInit {

  fg: FormGroup;
  Roles: any = [];
  rol:FormArray = new FormArray([]);

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiPermission: ApiPermissionService,
    private apiRol: ApiRolService

  ) {
    this.fg = this.formBuilder.group({
      name: [''],
      description: [''],
      rol: this.rol
    })
  }

  ngOnInit() { 
    this.apiRol.GetAll().subscribe(res => {
      this.Roles = res;
    });
  }

  onSubmit(): any {  
    this.apiPermission.Add(this.fg.value)
      .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('dashboard/permission/list'))
      }, (err) => {
        console.log(err);
      });
  }


  onCheckboxChange(e:any) { 
    const checkArray = this.fg.get('rol') as FormArray; 
    let item = new FormControl(e.target.value);
    if (e.target.checked) {
      checkArray.push(item);
    } else {
      let index = checkArray.controls.findIndex(x => x.value === e.target.value);
      checkArray.removeAt(index);
    }
  }
}
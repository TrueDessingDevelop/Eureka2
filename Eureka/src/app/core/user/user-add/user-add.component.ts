import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRolService } from '../../rol/services/api-rol.service';
import { ApiUserService } from '../services/api-user.service';

@Component({
  selector: 'user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

 
  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiRol: ApiRolService,
    private apiUser: ApiUserService

  ) {
    this.form = this.formBuilder.group({
      username: [''],
      email: ['']
    })
  }

  ngOnInit() { }

  onSubmit(): any {
    this.apiUser.Add(this.form.value)
      .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard/user/list'))
      }, (err) => {
        console.log(err);
      });
  }

}
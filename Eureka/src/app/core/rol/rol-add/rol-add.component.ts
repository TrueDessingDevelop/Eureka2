import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRolService } from '../services/api-rol.service';

@Component({
  selector: 'rol-add',
  templateUrl: './rol-add.component.html',
  styleUrls: ['./rol-add.component.css']
})
export class RolAddComponent implements OnInit {

  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiRol: ApiRolService

  ) {
    this.form = this.formBuilder.group({
      name: [''],
      description: ['']
    })
  }

  ngOnInit() { }

  onSubmit(): any {
    this.apiRol.Add(this.form.value)
      .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard/rol/list'))
      }, (err) => {
        console.log(err);
      });
  }

}
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiRolService } from '../services/api-rol.service';

@Component({
  selector: 'rol-detail',
  templateUrl: './rol-detail.component.html',
  styleUrls: ['./rol-detail.component.css']
})
export class RolDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private apiRol: ApiRolService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiRol.Get(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        description: res['description']
      });
    });

    this.updateForm = this.formBuilder.group({
      name: [''],
      description: ['']
    })
  }

  ngOnInit() { }

  onUpdate(): any {
    this.apiRol.Update(this.getId, this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard/rol/list'))
      }, (err) => {
        console.log(err);
      });
  }

}

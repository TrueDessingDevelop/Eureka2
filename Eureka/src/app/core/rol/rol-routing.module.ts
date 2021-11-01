import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolAddComponent } from './rol-add/rol-add.component';
import { RolDetailComponent } from './rol-detail/rol-detail.component';
import { RolListComponent } from './rol-list/rol-list.component';

const routes: Routes = [
 
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RolRoutingModule { }

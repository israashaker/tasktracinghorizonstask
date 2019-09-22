import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskItemComponent} from './tasks/task-item/task-item.component';
const routes: Routes = [
  {path:'',component:TaskItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoPageComponent } from './screens/todo-page/todo-page.component';

const routes: Routes = [
  {
    path: 'todo',
    component: TodoPageComponent,
  },
  // default path
  {
    path: '',
    redirectTo: '/todo',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

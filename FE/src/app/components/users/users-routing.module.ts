import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserDetailComponent } from './users-details/users-details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-users',
        component: ListUsersComponent,
        data: {
          title: 'Admin List',
          breadcrumb: 'Admin List',
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

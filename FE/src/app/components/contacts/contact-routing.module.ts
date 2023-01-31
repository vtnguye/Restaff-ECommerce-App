import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListContactComponent } from './list-contact/list-contact.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-contact',
        component: ListContactComponent,
        data: {
          title: 'Contact List',
          breadcrumb: 'Contact List',
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRouting {}

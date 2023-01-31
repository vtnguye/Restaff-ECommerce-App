import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBannersComponent } from './list-banners/list-banners.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-banners',
        component: ListBannersComponent,
        data: {
          title: "Banner List",
          breadcrumb: "Banner List"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BannersRoutingModule { }

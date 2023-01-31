import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageContentComponent } from './list-pageContent/list-page-content.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-page-content',
        component: ListPageContentComponent,
        data: {
          title: 'Page Content List',
          breadcrumb: 'Page Content List',
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageContentRouting {}

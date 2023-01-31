import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryDetailComponent } from './categories-details/categories-details.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'list-categories',
          component: ListCategoriesComponent,
          data: {
            title: "Category List",
            breadcrumb: "Category List"
          }
        },
        {
          path: 'create-categories',
          component: CategoryDetailComponent,
          data: {
            title: "Create Category",
            breadcrumb: "Create Category"
          }
        }
      ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
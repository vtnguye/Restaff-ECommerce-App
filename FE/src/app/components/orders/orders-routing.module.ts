import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOrdersComponent } from './list-order/list-orders.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-orders',
        component: ListOrdersComponent,
        data: {
          title: "Order List",
          breadcrumb: "Order List"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrdersRoutingModule { }

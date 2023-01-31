import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerDetailsComponent } from "./customer-details/customer-details.component";
import { ListCustomersComponent } from "./list-customers/list-customers.component";

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'list-customers',
          component: ListCustomersComponent,
          data: {
            title: "Customer List",
            breadcrumb: "Customer List"
          }
        },
        {
          path: 'create-customers',
          component: CustomerDetailsComponent,
          data: {
            title: "Create Customer",
            breadcrumb: "Create Customer"
          }
        },
      ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
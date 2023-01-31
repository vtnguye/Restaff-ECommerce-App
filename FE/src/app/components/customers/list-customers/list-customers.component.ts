import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ReturnMessage,
  PageModel,
  CustomerModel,
  TypeSweetAlertIcon,
} from 'src/app/lib/data/models';
import { CustomerService, FileService } from 'src/app/lib/data/services';
import { MessageService } from 'src/app/lib/data/services/messages/message.service';
import { CustomViewCellStringComponent } from 'src/app/shared/components/custom-view-cell-string/custom-view-cell-string.component';
import { CustomViewCellComponent } from 'src/app/shared/components/customViewCell/customViewCell.component';
import { ViewImageCellComponent } from 'src/app/shared/components/viewimagecell/viewimagecell.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss'],
  providers: [CustomerService],
})
export class ListCustomersComponent implements OnInit {
  public customers: CustomerModel[];
  closeResult = '';
  public data: PageModel<CustomerModel>;
  params: any = {};

  constructor(
    private modalService: NgbModal,
    private customerService: CustomerService,
    private messageService: MessageService
  ) {
    this.getList();
  }
  ngOnInit(): void { }

  public settings = {
    mode: 'external',
    actions: {
      position: 'right',
    },
    columns: {
      username: {
        title: 'Username',
        type: 'custom',
        renderComponent: CustomViewCellStringComponent,
      },
      firstName: {
        title: 'First Name',type: 'custom',
        renderComponent: CustomViewCellStringComponent,
      },
      lastName: {
        title: 'Last Name',type: 'custom',
        renderComponent: CustomViewCellStringComponent,
      },
      email: {
        title: 'Email',type: 'custom',
        renderComponent: CustomViewCellStringComponent,
      },
      phone: {
        title: 'Phone',
        type: 'custom',
        renderComponent: CustomViewCellComponent,
      },
    },
  };

  delete(event: any) {
    let category = event.data as CustomerModel;
      this.messageService.confirm(`Do you want to delete the customer?`, 'Yes').then((it) => {
      if (it.isConfirmed) {
        this.customerService
          .delete(category)
          .then((it: CustomerModel) => {
            this.messageService.notification(
              `Customer has been deleted`,
              TypeSweetAlertIcon.SUCCESS,
            );
            this.getList();
          })
          .catch((er) => {
            this.messageService.notification(
              `Delete Fail`,
              TypeSweetAlertIcon.ERROR,
              er.error.message ??
              JSON.stringify(er.error.error) ??
              'Server Disconnected'
            );
          });
      }
    });
  }

  openPopup(item: any) {
    var modalRef = this.modalService.open(CustomerDetailsComponent, {
      size: 'lg',
    });
    if (item) modalRef.componentInstance.item = item.data;

    modalRef.result.then(
      (close) => {
        this.getList();
      },
      (dismiss) => { }
    );
  }

  getList() {
    this.customerService
      .get({ params: this.params })
      .then((res: ReturnMessage<PageModel<CustomerModel>>) => {
        if (!res.hasError) {
          this.customers = res.data.results;
          this.data = res.data;
        }
      })
      .catch((er) => {
        this.messageService.alert(
          er.error.message ??
          JSON.stringify(er.error.error) ??
          'Server Disconnected',
          TypeSweetAlertIcon.ERROR
        );
      });
  }

  onPage(event) {
    this.params.pageIndex = event;
    this.getList();
  }
}

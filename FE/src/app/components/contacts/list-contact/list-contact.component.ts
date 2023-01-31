import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, TypeSweetAlertIcon } from 'src/app/lib/data/models';
import { ReturnMessage } from 'src/app/lib/data/models/common/return-message.model';
import { ContactModel } from 'src/app/lib/data/models/contact/contact.model';
import { PageContentModel } from 'src/app/lib/data/models/pageContent/pageContent.model';
import { ContactService } from 'src/app/lib/data/services/contacts/contact.service';
import { MessageService } from 'src/app/lib/data/services/messages/message.service';
import { PageContentService } from 'src/app/lib/data/services/pageContents/pageContent.service';
import { CustomViewCellStringComponent } from 'src/app/shared/components/custom-view-cell-string/custom-view-cell-string.component';
import { CustomViewCellComponent } from 'src/app/shared/components/customViewCell/customViewCell.component';
import { ContactDetailComponent } from '../contact-details/contact-details.component';

@Component({
  selector: 'app-list-page-content',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss'],
  providers: [ContactService, DatePipe],
})
export class ListContactComponent {
  public contacts: ContactModel[];
  public data: PageModel<ContactModel>;
  params: any = {};

  constructor(
    private modalService: NgbModal,
    private contactService: ContactService,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {
    this.getList();
  }

  public settings = {
    mode: 'external',
    pager: {
      display: true,
      perPage: 10,
    },
    actions: {
      position: 'right',
      add: false,
      delete: false,
    },
    columns: {
      firstName: {
        title: 'First Name',
        type: 'custom',
        renderComponent: CustomViewCellStringComponent,
      },
      lastName: {
        title: 'Last Name',
        type: 'custom',
        renderComponent: CustomViewCellStringComponent,
      },
      phoneNumber: {
        title: 'Phone Number',
        type: 'custom',
        renderComponent: CustomViewCellComponent,
      },
      email: { title: 'Email' },
      status: { title: 'Status' },
      createByDate: {
        title: 'Create Date',
        valuePrepareFunction: (date) => {
          return this.datePipe.transform(new Date(date), 'dd/MM/yyyy');
        },
        type: 'custom',
        renderComponent: CustomViewCellComponent,
      },
    },
  };

  openPopup(item: any) {
    var modalRef = this.modalService.open(ContactDetailComponent, {
      size: 'lg',
    });
    if (item) modalRef.componentInstance.item = item.data;

    if (!item) modalRef.componentInstance.item = item as PageContentModel;

    modalRef.result.then(
      (close) => {
        this.getList();
      },
      (dismiss) => {}
    );
  }

  delete(event: any) {
    this.messageService
      .confirm(`Do you want to delete the category?`, 'Yes')
      .then((res) => {
        if (res.isConfirmed) {
          let contact = event.data as ContactModel;
          this.contactService.delete(contact).then(() => {
            this.messageService.notification(
              'Contact has been deleted',
              TypeSweetAlertIcon.SUCCESS
            );
            this.getList();
          });
        }
      });
  }

  getList() {
    this.contactService
      .getList(null)
      .then((res: ReturnMessage<ContactModel[]>) => {
        if (!res.hasError) {
          this.contacts = res.data;
          // console.log('contact', res.data);
        }
      })
      .catch((er) => {
        if (er.error.hasError) {
          // console.log(er.error.message);
        }
      });
  }

  onPage(event) {
    this.params.pageIndex = event;
    this.getList();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  PageModel,
  ReturnMessage,
  TypeSweetAlertIcon,
} from 'src/app/lib/data/models';
import {
  OrderDetailModel,
  OrderModel,
} from 'src/app/lib/data/models/orders/order.model';

import { OrderDetailsService } from 'src/app/lib/data/services/orders/order-details.service';
import { OrdersService } from 'src/app/lib/data/services/orders/orders.service';
import { ViewImageCellComponent } from 'src/app/shared/components/viewimagecell/viewimagecell.component';
import {
  ModalFooterModel,
  ModalHeaderModel,
} from 'src/app/shared/components/modals/models/modal.model';
import Swal from 'sweetalert2';
import { CustomViewCellNumberComponent } from 'src/app/shared/components/custom-view-cell-number/custom-view-cell-number.component';
import { CustomViewCellComponent } from 'src/app/shared/components/customViewCell/customViewCell.component';
import { MessageService } from 'src/app/lib/data/services/messages/message.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss'],
  providers: [OrdersService, OrderDetailsService],
})
export class UpdateOrderComponent implements OnInit {
  public orderForm: FormGroup;
  public item: any;
  public order = new OrderModel();
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  submitted = false;
  public orderDetails: OrderDetailModel[];

  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private ordersService: OrdersService,
    private orderDetailsService: OrderDetailsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadFormItem();
    this.createModal();
    this.getOrderDetails();
  }

  public settings = {
    mode: 'external',
    actions: false,
    columns: {
      productImgUrl: {
        title: 'Image',
        type: 'custom',
        renderComponent: ViewImageCellComponent,
      },
      productName: {
        title: 'Product Name',
      },
      price: {
        title: 'Price',
        value: 'price',
        type: 'custom',
        renderComponent: CustomViewCellNumberComponent,
      },
      quantity: {
        title: 'Quantity',
        value: 'quantity',
        type: 'custom',
        renderComponent: CustomViewCellComponent,
      },
      totalAmount: {
        title: 'Total Amount',
        value: 'totalAmount',
        type: 'custom',
        renderComponent: CustomViewCellNumberComponent,
      },
    },
  };

  loadFormItem() {
    var check = this.item.status == 'Rejected';
    this.orderForm = this.formBuilder.group({
      fullName: [
        { value: this.item.fullName, disabled: check },
        Validators.required,
      ],
      address: [
        { value: this.item.address, disabled: check },
        Validators.required,
      ],
      email: [{ value: this.item.email, disabled: check }, Validators.required],
      phone: [{ value: this.item.phone, disabled: check }, Validators.required],
      status: [
        { value: this.item.status, disabled: true },
        Validators.required,
      ],
    });
  }

  createModal() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = `Update Order`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.buttons = [
      {
        color: 'btn btn-primary',
        title: 'close',
        onAction: (event: any) => {
          this.ngbActiveModal.dismiss();
        },
      },
    ];
    if (this.item.status == 'New') {
      this.modalFooter.buttons = [
        {
          color: 'btn btn-info',
          title: 'save',
          onAction: (event: any) => {
            this.save();
          },
        },
        {
          color: 'btn btn-success',
          title: 'approve',
          onAction: (event: any) => {
            this.approve();
          },
        },
        {
          color: 'btn btn-primary',
          title: 'reject',
          onAction: (event: any) => {
            this.reject();
          },
        },
      ];
    }

    if (this.item.status == 'Approved') {
      this.modalFooter.buttons = [
        {
          color: 'btn btn-info',
          title: 'save',
          onAction: (event: any) => {
            this.save();
          },
        },
        {
          color: 'btn btn-primary',
          title: 'close',
          onAction: (event: any) => {
            this.ngbActiveModal.dismiss();
          },
        },
      ];
    }
  }

  get orderFormControl() {
    return this.orderForm.controls;
  }

  loadOrderModel() {
    this.order = {
      fullName: this.orderForm.controls.fullName.value,
      address: this.orderForm.controls.address.value,
      email: this.orderForm.controls.email.value,
      phone: this.orderForm.controls.phone.value,
      status: this.item.status,
      id: this.item.id,
      totalAmount: this.item.totalAmount,
      totalItem: this.item.totalItem,
    };
  }

  save() {
    this.loadOrderModel();

    this.submitted = true;
    if (this.orderForm.valid) {
      this.ordersService
        .update(this.order)
        .then(() => {
          this.messageService.notification(
            'Order has been edited',
            TypeSweetAlertIcon.SUCCESS
          );
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
  }

  approve() {
    this.loadOrderModel();
    this.order.status = 'Approved';

    this.messageService
      .confirm(`Do you want to approve the order?`, 'Yes', 'No', false)
      .then(async (result) => {
        if (result.isConfirmed) {
          this.submitted = true;
          if (this.orderForm.valid) {
            this.ordersService
              .update(this.order)
              .then(() => {
                this.messageService.notification(
                  'Order has been approved',
                  TypeSweetAlertIcon.SUCCESS
                );
                this.ngbActiveModal.close();
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
        }
      });
  }

  reject() {
    this.loadOrderModel();
    this.order.status = 'Rejected';
    Swal.fire({
      title: `Do you want to reject the order?`,
      input: 'text',
      inputPlaceholder: 'Why?',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      icon: 'question',
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.submitted = true;
        this.order.note = result.value;
        console.log(result.value);
        if (this.orderForm.valid) {
          this.ordersService
            .update(this.order)
            .then((res) => {
              this.messageService.notification(
                'Order has been rejected',
                TypeSweetAlertIcon.SUCCESS
              );
              this.ngbActiveModal.close();
            })
            .catch((er) => {
              this.messageService.alert(
                er.error.message ??
                  JSON.stringify(er.error.error) ??
                  'Server Disconnected',
                TypeSweetAlertIcon.ERROR
              );
              // if (er.error.hasError) {
              //   console.log(er.error.message);
              // }
            });
        }
      }
    });
  }

  getOrderDetails() {
    this.orderDetailsService
      .getByOrder(this.item.id, null)
      .then((res: ReturnMessage<OrderDetailModel[]>) => {
        if (!res.hasError) {
          this.orderDetails = res.data;
        }
      })
      .catch((er) => {
        this.messageService.alert(
          er.error.message ??
            JSON.stringify(er.error.error) ??
            'Server Disconnected',
          TypeSweetAlertIcon.ERROR
        );
        // if (er.error.hasError) {
        //   console.log(er.error.message);
        // }
      });
  }
  close(event: any) {
    this.ngbActiveModal.dismiss();
  }
}

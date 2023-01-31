import { DatePipe, formatPercent } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  PageModel,
  ReturnMessage,
  TypeSweetAlertIcon,
} from 'src/app/lib/data/models';
import { CouponModel } from 'src/app/lib/data/models/coupons/coupon.model';
import { CouponService } from 'src/app/lib/data/services/coupons/coupon.service';
import { MessageService } from 'src/app/lib/data/services/messages/message.service';
import { VndFormatPipe } from 'src/app/lib/data/services/pipe/vnd-format.pipe';
import { CustomViewCellStringComponent } from 'src/app/shared/components/custom-view-cell-string/custom-view-cell-string.component';
import { CustomViewCellComponent } from 'src/app/shared/components/customViewCell/customViewCell.component';
import { CouponDetailComponent } from '../coupon-detail/coupon-detail.component';

@Component({
  selector: 'app-list-coupon',
  templateUrl: './list-coupon.component.html',
  styleUrls: ['./list-coupon.component.scss'],
  providers: [VndFormatPipe],
})
export class ListCouponComponent implements OnInit {
  public coupons: CouponModel[];
  public data: PageModel<CouponModel>;
  params: any = {};
  constructor(
    private modalService: NgbModal,
    private couponService: CouponService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private vndFormatPipe: VndFormatPipe
  ) {}

  getCoupons() {
    this.couponService
      .get({ params: this.params })
      .then((res: ReturnMessage<PageModel<CouponModel>>) => {
        if (!res.hasError) {
          this.coupons = res.data.results;
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
  public settings = {
    mode: 'external',
    actions: {
      position: 'right',
    },
    columns: {
      code: {
        title: 'Code',
        type: 'custom',
        renderComponent: CustomViewCellStringComponent,
      },
      name: {
        title: 'Name',
        type: 'custom',
        renderComponent: CustomViewCellStringComponent,
      },
      value: {
        title: 'Value',
        type: 'custom',
        valuePrepareFunction: (created) => {
          if (created < 100) {
            return formatPercent(created / 100, 'en-us', '1.0-0');
          }
          return this.vndFormatPipe.transform(created);
        },
        renderComponent: CustomViewCellComponent,
      },
      startDate: {
        filter: false,
        title: 'Start Date',
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'dd/MM/yyyy');
        },
        type: 'custom',
        renderComponent: CustomViewCellComponent,
      },
      endDate: {
        filter: false,
        title: 'End Date',
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'dd/MM/yyyy');
        },
        type: 'custom',
        renderComponent: CustomViewCellComponent,
      },
    },
  };

  open(event: any) {
    var modalRef = this.modalService.open(CouponDetailComponent, {
      size: 'lg',
    });
    if (event) {
      modalRef.componentInstance.item = event?.data;
    }
    modalRef.result.then(
      () => this.getCoupons(),
      (dismiss) => {}
    );
  }

  delete(event: any) {
    this.messageService
      .confirm(`Do you want to delete the coupon?`, 'Yes')
      .then((res) => {
        if (res.isConfirmed) {
          let coupon = event.data as CouponModel;
          this.couponService.delete(coupon).then(() => {
            this.messageService.notification(
              'Coupon has been deleted',
              TypeSweetAlertIcon.SUCCESS
            );
            this.getCoupons();
          });
        }
      });
  }
  onPage(event) {
    this.params.pageIndex = event;
    this.getCoupons();
  }
  ngOnInit() {
    this.params.pageIndex = 0;
    this.getCoupons();
  }
}

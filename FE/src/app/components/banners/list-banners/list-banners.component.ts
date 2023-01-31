import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  PageModel,
  ReturnMessage,
  TypeSweetAlertIcon,
} from 'src/app/lib/data/models';
import { BannerModel } from 'src/app/lib/data/models/banners/banner.model';

import { BannersService } from 'src/app/lib/data/services/banners/banners.service';
import { MessageService } from 'src/app/lib/data/services/messages/message.service';
import { CustomViewCellStringComponent } from 'src/app/shared/components/custom-view-cell-string/custom-view-cell-string.component';
import { CustomViewCellComponent } from 'src/app/shared/components/customViewCell/customViewCell.component';
import { ViewImageCellComponent } from 'src/app/shared/components/viewimagecell/viewimagecell.component';

import { BannersDetailComponent } from '../banners-detail/banners-detail.component';

@Component({
  selector: 'app-list-banners',
  templateUrl: './list-banners.component.html',
  styleUrls: ['./list-banners.component.scss'],
  providers: [],
})
export class ListBannersComponent implements OnInit {
  public banners: BannerModel[];
  public data: PageModel<BannerModel>;
  params: any = {};

  constructor(
    private modalService: NgbModal,
    private bannersService: BannersService,
    private messageService: MessageService
  ) {
    this.getBanners();
  }
  ngOnInit() {}
  public settings = {
    mode: 'external',
    actions: {
      position: 'right',
    },
    columns: {
      imageUrl: {
        filter: false,
        title: 'Image',
        type: 'custom',
        renderComponent: ViewImageCellComponent,
      },
      title: {
        title: 'Title',
        type: 'custom',
        renderComponent: CustomViewCellStringComponent,
      },
      description: {
        title: 'Description',
      },
      link:{
        title: 'Link',
        type: 'html',
        valuePrepareFunction: (value) => {
          return `<a href='${value}' target="_blank">${value}</a>`
        },
      },
      displayOrder: {
        title: 'Display Order',
        value: 'displayOrder',
        type: 'custom',
        renderComponent: CustomViewCellComponent,
      },
    },
  };

  getBanners() {
    this.bannersService
      .get({params: this.params})
      .then((res: ReturnMessage<PageModel<BannerModel>>) => {
        if (!res.hasError) {
          this.banners = res.data.results;
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

  openDetails(event: any) {
    var modalRef = this.modalService.open(BannersDetailComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.item = event?.data;
    modalRef.result.then(
      (close) => this.getBanners(),
      (dismiss) => {}
    );
  }

  delete(event: any) {
    this.messageService
      .confirm(`Do you want to delete the banner?`, 'Yes')
      .then((res) => {
        if (res.isConfirmed) {
          let banner = event.data as BannerModel;
          this.bannersService
            .delete(banner)
            .then(() => {
              this.messageService.notification(
                'Banner has been deleted',
                TypeSweetAlertIcon.SUCCESS
              );
              this.getBanners();
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
      });
  }

  onPage(event) {
    this.params.pageIndex = event;
    this.getBanners();
  }
}

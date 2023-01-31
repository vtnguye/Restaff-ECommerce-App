import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  PageModel,
  ReturnMessage,
  TypeSweetAlertIcon,
} from 'src/app/lib/data/models';
import { SocialMediaModel } from 'src/app/lib/data/models/social-medias/social-media.model';
import { MessageService } from 'src/app/lib/data/services/messages/message.service';
import { SocialMediaService } from 'src/app/lib/data/services/social-media/social-media.service';
import { CustomViewCellStringComponent } from 'src/app/shared/components/custom-view-cell-string/custom-view-cell-string.component';
import { CustomViewCellComponent } from 'src/app/shared/components/customViewCell/customViewCell.component';
import { ViewImageCellComponent } from 'src/app/shared/components/viewimagecell/viewimagecell.component';
import { SocialMediaDetailComponent } from '../social-media-detail/social-media-detail.component';

@Component({
  selector: 'app-list-social-media',
  templateUrl: './list-social-media.component.html',
  styleUrls: ['./list-social-media.component.scss'],
})
export class ListSocialMediaComponent implements OnInit {
  public socialMedias: SocialMediaModel[];
  public data: PageModel<SocialMediaModel>;
  params: any = {};
  constructor(
    private modalService: NgbModal,
    private socialService: SocialMediaService,
    private messageService: MessageService
  ) {}

  getSocialMedias() {
    this.socialService
      .get({ params: this.params })
      .then((res: ReturnMessage<PageModel<SocialMediaModel>>) => {
        if (!res.hasError) {
          this.socialMedias = res.data.results;
          this.data = res.data;
        }
      })
      .catch((er) => {
        if (er.error.hasError) {
        }
      });
  }

  public settings = {
    mode: 'external',
    actions: {
      position: 'right',
    },
    columns: {
      iconUrl: {
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
      link: {
        title: 'Link',
        type: 'html',
        valuePrepareFunction: (value) => {
          return `<a href='${value}' target="_blank">${value}</a>`
        },
      },
      displayOrder: {
        title: 'Display Order',
        type: 'custom',
        renderComponent: CustomViewCellComponent,
      },
    },
  };

  open(event: any) {
    var modalRef = this.modalService.open(SocialMediaDetailComponent, {
      size: 'lg',
    });
    if (event) {
      modalRef.componentInstance.item = event?.data;
    }
    modalRef.result.then(() => this.getSocialMedias(),(dismiss)=>{});
  }

  delete(event: any) {
    this.messageService
      .confirm(`Do you want to delete the social media?`, 'Yes')
      .then((res) => {
        if (res.isConfirmed) {
          let socialMedia = event.data as SocialMediaModel;
          this.socialService.delete(socialMedia).then(() => {
            this.messageService.notification(
              'Social media has been deleted',
              TypeSweetAlertIcon.SUCCESS
            );
            this.getSocialMedias();
          });
        }
      });
  }

  onPage(event) {
    this.params.pageIndex = event;
    this.getSocialMedias();
  }
  ngOnInit(): void {
    this.params.pageIndex = 0;
    this.getSocialMedias();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import {
  PageModel,
  ReturnMessage,
  TypeSweetAlertIcon,
  UserDataReturnDTOModel,
} from 'src/app/lib/data/models';
import { CategoryModel } from 'src/app/lib/data/models/categories/category.model';
import { UserModel } from 'src/app/lib/data/models/users/user.model';
import { AuthService, FileService } from 'src/app/lib/data/services';
import { MessageService } from 'src/app/lib/data/services/messages/message.service';
import { CustomViewCellStringComponent } from 'src/app/shared/components/custom-view-cell-string/custom-view-cell-string.component';
import { ViewImageCellComponent } from 'src/app/shared/components/viewimagecell/viewimagecell.component';
import { UserDetailComponent } from '../users-details/users-details.component';
import { UserService } from './../../../lib/data/services/users/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  providers: [UserService],
})
export class ListUsersComponent implements OnInit, OnDestroy {
  public users: UserModel[];
  closeResult = '';
  public data: PageModel<UserModel>;
  params: any = {};
  userInfo: UserDataReturnDTOModel;
  subUser: Subscription;
  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.getList();
  }
  ngOnDestroy(): void {
    this.subUser.unsubscribe();
    this.subUser = null;
  }
  ngOnInit(): void {
    this.subUser = this.authService.callUserInfo.subscribe(
      (res) => (this.userInfo = res)
    );
  }

  public settings = {
    mode: 'external',
    pager: {
      display: true,
      perPage: 10,
    },
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
      username: {
        title: 'Username',
        type: 'custom',
        renderComponent: CustomViewCellStringComponent,
      },
      email: {
        title: 'Email',
      },
      firstName: {
        title: 'First Name',
      },
      lastName: {
        title: 'Last Name',
      },
    },
  };

  delete(event: any) {
    if (
      event.data.id == '10000000-0000-0000-0000-000000000000' ||
      event.data.id == this.userInfo.id
    ) {
      this.messageService.alert(
        'Your access permissions may be inadequate to perform the requested operation on this resource.',
        TypeSweetAlertIcon.INFO
      );
      return;
    }
    this.messageService
      .confirm(`Do you want to delete the user?`, 'Yes')
      .then((res) => {
        if (res.isConfirmed) {
          let user = event.data as UserModel;
          this.userService
            .delete(user)
            .then(() => {
              this.messageService.notification(
                'User has been deleted',
                TypeSweetAlertIcon.SUCCESS
              );
              this.getList();
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

  openPopup(item: any) {
    if (
      '10000000-0000-0000-0000-000000000000' != this.userInfo.id &&
      item?.data.id == '10000000-0000-0000-0000-000000000000'
    ) {
      this.messageService.alert(
        'Your access permissions may be inadequate to perform the requested operation on this resource.',
        TypeSweetAlertIcon.INFO
      );
      return;
    }
    var modalRef = this.modalService.open(UserDetailComponent, {
      size: 'lg',
    });
    if (item) modalRef.componentInstance.item = item.data;

    modalRef.result.then(
      (close) => {
        this.getList();
      },
      (dismiss) => {}
    );
  }

  getList() {
    this.userService
      .get({ params: this.params })
      .then((res: ReturnMessage<PageModel<UserModel>>) => {
        if (!res.hasError) {
          this.users = res.data.results;
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

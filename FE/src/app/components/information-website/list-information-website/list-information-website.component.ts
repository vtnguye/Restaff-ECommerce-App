import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  PageModel,
  ReturnMessage,
  TypeSweetAlertIcon,
} from 'src/app/lib/data/models';
import { InformationWebModel } from 'src/app/lib/data/models/information-website/info-web.model';
import { FileService } from 'src/app/lib/data/services';
import { InformationWebsiteService } from 'src/app/lib/data/services/information-website/infoWeb.service';
import { MessageService } from 'src/app/lib/data/services/messages/message.service';
import {
  EntityType,
  ModalFile,
  TypeFile,
} from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-list-information-website',
  templateUrl: './list-information-website.component.html',
  styleUrls: ['./list-information-website.component.scss'],
  providers: [InformationWebsiteService],
})
export class ListInformationWebsiteComponent implements OnInit {
  public infoWeb: InformationWebModel;
  public inforWebForm: FormGroup;
  submitted = false;
  update = false;
  public modalFile: ModalFile;
  public fileURL: (String | ArrayBuffer)[];

  constructor(
    private formBuilder: FormBuilder,
    private inforWebService: InformationWebsiteService,
    private messageService: MessageService
  ) {
    this.modalFile = new ModalFile();
    this.modalFile.typeFile = TypeFile.IMAGE;
    this.modalFile.multiBoolen = false;
    this.modalFile.enityType = EntityType.USER;
  }
  ngOnInit() {
    this.fetch();
    if (this.infoWeb) {
      this.fileURL = [];
      this.fileURL.push(this.infoWeb.logo);
    }
  }

  get inforWebFormControl() {
    return this.inforWebForm.controls;
  }

  fetch() {
    this.inforWebService
      .get(null)
      .then((res: ReturnMessage<InformationWebModel>) => {
        if (!res.hasError) {
          this.infoWeb = res.data;
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
        // }
      });
  }
  updateSwitch() {
    this.modalFile.listFile = [];
    this.update = this.update == true ? false : true;
    if (this.update) {
      this.loadForminfoWeb();
    }
    this.fetch();
  }

  //Address , Phone, Email, Fax, Logo
  loadForminfoWeb() {
    if (this.infoWeb) {
      this.fileURL = [];
      this.fileURL.push(this.infoWeb.logo);
    }
    this.inforWebForm = this.formBuilder.group({
      title: [this.infoWeb ? this.infoWeb.title : '', Validators.required],
      address: [
        this.infoWeb ? this.infoWeb.address : '',
        [Validators.required],
      ],
      phone: [this.infoWeb ? this.infoWeb.phone : '', Validators.required],
      email: [this.infoWeb ? this.infoWeb.email : '', Validators.required],
      fax: [this.infoWeb ? this.infoWeb.fax : '', Validators.required],
      description: [
        this.infoWeb ? this.infoWeb.description : '',
        Validators.required,
      ],
      logo: [this.infoWeb ? this.infoWeb.logo : '', Validators.required],
    });
  }

  updateDetails() {
    if (this.inforWebForm.invalid) {
      this.messageService.alert(
        'Invalid Form make sure you input valid value !',
        TypeSweetAlertIcon.ERROR
      );
      return;
    }
    this.infoWeb = {
      address: this.inforWebForm.controls.address.value,
      phone: this.inforWebForm.controls.phone.value,
      email: this.inforWebForm.controls.email.value,
      fax: this.inforWebForm.controls.fax.value,
      logo: this.inforWebForm.controls.logo.value,
      title: this.inforWebForm.controls.title.value,
      description: this.inforWebForm.controls.description.value,
      createdBy: this.infoWeb ? this.infoWeb.createdBy : '',
      createdByName: this.infoWeb ? this.infoWeb.createdByName : '',
      deletedBy: this.infoWeb ? this.infoWeb.deletedBy : '',
      deletedByName: this.infoWeb ? this.infoWeb.deletedByName : '',
      isActive: this.infoWeb ? this.infoWeb.isActive : false,
      isDeleted: this.infoWeb ? this.infoWeb.isDeleted : false,
      updatedBy: this.infoWeb ? this.infoWeb.updatedBy : '',
      updatedByName: this.infoWeb ? this.infoWeb.updatedByName : '',
      id: this.infoWeb.id,
      files: this.modalFile.listFile,
    };
    this.inforWebService
      .update(this.infoWeb)
      .then((resp: ReturnMessage<InformationWebModel>) => {
        this.infoWeb = resp.data;
        this.messageService.notification(
          this.infoWeb ? 'Update Success' : 'Create Success',
          TypeSweetAlertIcon.SUCCESS
        );
        if (!resp.hasError) {
          this.updateSwitch();
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
        //   // console.log(er.error.message);
        // }
      });
  }
  onChangeData(event: { add: string[]; remove: string; removeAll: boolean }) {
    if (event == null) {
      return;
    }

    if (!this.fileURL) {
      this.fileURL = [];
    }

    if (event.add) {
      this.fileURL = [...this.fileURL, ...event.add];
    }

    if (event.remove) {
      this.fileURL.forEach((e, i) => {
        if (e == event.remove) {
          this.fileURL.splice(i, 1);
        }
      });
    }

    if (event.removeAll) {
      this.fileURL = [];
    }

    this.inforWebForm.controls.logo.setValue(this.fileURL.toString());
  }
}

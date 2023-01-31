import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import {
  AuthRegistModel,
  ReturnMessage,
  TypeSweetAlertIcon,
} from "src/app/lib/data/models";
import { UserDataReturnDTOModel } from "src/app/lib/data/models/users/user.model";
import { AuthService, MessageService } from "src/app/lib/data/services";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registForm: FormGroup;
  submitted = false;
  subDataUser: Subscription;
  userInfo: UserDataReturnDTOModel;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private sweetalertService: MessageService
  ) {
    this.createRegistForm();
  }
  ngOnDestroy(): void {
    this.subDataUser.unsubscribe();
    this.subDataUser = null;
  }

  ngOnInit(): void {
    this.subDataUser = this.authService.callUserInfo.subscribe((res) => {
      this.userInfo = res;
      if (this.userInfo) {
        this.backUrl();
      }
    });
  }
  createRegistForm() {
    this.registForm = this.formBuilder.group(
      {
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        username: [null, [Validators.required]],
        email: [
          null,
          [
            Validators.required,
            Validators.pattern(
              "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"
            ),
          ],
        ],
        password: [null, [Validators.required]],
        confirmpassword: [null, [Validators.required]],
      },
      { validators: this.checkValidators }
    );
  }

  get f() {
    return this.registForm.controls;
  }

  checkValidators(group: FormGroup) {
    const pass = group.get("password");
    const confirmpass = group.get("confirmpassword");
    if (pass.value !== confirmpass.value) {
      confirmpass.setErrors({ mustMatch: true });
    }
  }

  async onRegist() {
    this.submitted = true;

    if (this.registForm.invalid) {
      return;
    }

    var data: AuthRegistModel = this.registForm.value;
    data.username = data.username.trim();
    data.lastName = data.lastName.trim();
    data.firstName = data.firstName.trim();
    data.email = data.email.trim();
    data.confirmpassword = undefined;
    await this.authService
      .register(data)
      .then((data: ReturnMessage<UserDataReturnDTOModel>) => {
        localStorage.setItem("token", data.data.token);
        this.authService.changeUserInfo(data.data);
        // this.backUrl();
      })
      .catch((er) => {
        this.sweetalertService.alert(
          "Register Fail",
          TypeSweetAlertIcon.ERROR,
          er.error.message ??
            JSON.stringify(er.error.error) ??
            "Server Disconnected"
        );
      });
  }

  backUrl() {
    var returnUrl = this.activedRoute.snapshot.queryParams["returnUrl"] || "/";
    this.callUrl(returnUrl);
  }

  callUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}

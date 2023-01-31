import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import {
  AuthLoginModel,
  ReturnMessage,
  TypeSweetAlertIcon,
} from "src/app/lib/data/models";
import { UserDataReturnDTOModel } from "src/app/lib/data/models/users/user.model";
import { AuthService, MessageService } from "src/app/lib/data/services";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
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
    this.createLoginForm();
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

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  backUrl() {
    var returnUrl = decodeURIComponent(this.activedRoute.snapshot.queryParams["returnUrl"] || "/");
    this.callUrl(returnUrl);
  }

  callUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  async onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    var data: AuthLoginModel = this.loginForm.value;
    data.username = data.username.trim();
    await this.authService
      .login(data)
      .then((data: ReturnMessage<UserDataReturnDTOModel>) => {
        localStorage.setItem("token", data.data.token);
        this.authService.changeUserInfo(data.data);
        // this.backUrl();
      })
      .catch((er) => {
        this.sweetalertService.alert(
          "Login Fail",
          TypeSweetAlertIcon.ERROR,
          er.error.message ??
            JSON.stringify(er.error.error) ??
            "Server Disconnected"
        );
      });
  }
}

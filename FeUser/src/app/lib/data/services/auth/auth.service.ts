import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/app/lib/environments/environment";
import { HttpClientService } from "src/app/lib/http/http-client";
import { AuthLoginModel, AuthRegistModel, ReturnMessage } from "../../models";
import { UserDataReturnDTOModel } from "../../models/users/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClientService) {}

  private url = "/api/user/auth";
  private urlLogin = this.url + "/login";
  private urlRegiter = this.url + "/regist";
  private urlCheckEmail = this.url + "/checkemail";
  private urlCheckPhone = this.url + "/checkphone";
  private urlCheckUserName = this.url + "/checkusername";

  ngOnInit(): void {}

  login(body: AuthLoginModel) {
    return this.http.postObservable(this.urlLogin, body).toPromise();
  }

  register(body: AuthRegistModel) {
    return this.http.postObservable(this.urlRegiter, body).toPromise();
  }

  getInformationUser() {
    return this.http.getObservable(this.url).toPromise();
  }

  private static userInfo = new BehaviorSubject<UserDataReturnDTOModel>(
    JSON.parse(localStorage["user"] || "null")
  );
  callUserInfo = AuthService.userInfo.asObservable();

  changeUserInfo(userInfo: UserDataReturnDTOModel) {
    localStorage["user"] = JSON.stringify(userInfo);
    AuthService.userInfo.next(userInfo);
  }
}

export interface AuthLoginModel {
  username: string;
  password: string;
}

export class AuthRegistModel {
  username: string;
  password: string;
  confirmpassword: string = undefined;
  email: string;
  firstName: string;
  lastName: string;
}

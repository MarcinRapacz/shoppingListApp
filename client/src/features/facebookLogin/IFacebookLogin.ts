import { ReactFacebookLoginInfo } from "react-facebook-login";

export interface Response extends ReactFacebookLoginInfo {
  signedRequest: string;
}

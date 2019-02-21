import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from "angular-6-social-login-v2";

@Injectable()
export class SocialUserAuthService {

  constructor(private http: HttpClient,
    private socialAuthService: AuthService) { }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);


      }
    );
  }

}

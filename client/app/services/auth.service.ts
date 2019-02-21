import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from './user.service';
import { GeoLocationService } from './/geo-location.service';
import { UsersSettingService } from './users-settings.service';
import { User } from '../shared/models/user.model';

import 'rxjs/add/operator/map';

@Injectable()
export class UserAuthService {
  loggedIn = false;
  isAdmin = false;
  geoLocation = [];
  currentUser: User = new User();
  userDataHold: any;
  loginSecondStep: Boolean;

  constructor(private userService: UserService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private geoLocationService: GeoLocationService,
    private usersSettingService: UsersSettingService) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).map(
      res => {
        let two_step_login = res;
        const decodedUser = this.decodeUserFromToken(res.token);
        this.usersSettingService.getSetting(decodedUser._id).subscribe(
          res => {
            if (res != "null") {
              let data = JSON.parse(res);
              if (!data.two_step_verification) {
                this.loginSecondStep = false;
                document.getElementById("closeLoginModal").click();
                this.router.navigate(['/']);
                localStorage.setItem('token', two_step_login.token);
                const decodedUser = this.decodeUserFromToken(two_step_login.token);
                this.setCurrentUser(decodedUser);
                this.getcurrentlocation();
                return this.loggedIn;
              } else {
                this.loginSecondStep = true;
                this.userDataHold = two_step_login;
                localStorage.setItem('userDataHold', two_step_login);
              }
            } else {
              document.getElementById("closeLoginModal").click();
              this.router.navigate(['/']);
              localStorage.setItem('token', two_step_login.token);
              const decodedUser = this.decodeUserFromToken(two_step_login.token);
              this.setCurrentUser(decodedUser);
              return this.loggedIn;
            }
          },
          error => console.log(error),
        );

      }
    );
  }


  socialLogin(user) {
    localStorage.setItem('token', user.token);
    const decodedUser = this.decodeUserFromToken(user.token);
    this.setCurrentUser(decodedUser);
    return this.loggedIn;
  }

  confirmLoginUser(code: any) {
    if (this.userDataHold.OTP == code.confirmCode) {
      localStorage.setItem('token', this.userDataHold.token);
      const decodedUser = this.decodeUserFromToken(this.userDataHold.token);
      this.setCurrentUser(decodedUser);
      this.getcurrentlocation();
      return this.loggedIn;
    }
  }


  getcurrentlocation() {
    this.geoLocationService.allowCurrentLocation();
  }

  getUserSetting() {
    if (this.loggedIn) {
      this.usersSettingService.getSetting(this.currentUser._id).subscribe(
        res => {
          if (res != "null") {
            let data = JSON.parse(res);
            if (data.allow_location)
              this.getcurrentlocation();
          }
        },
        error => console.log(error),
      );
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = new User();
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    delete decodedUser.role;
  }

}

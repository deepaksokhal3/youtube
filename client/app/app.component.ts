import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserAuthService } from './services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastComponent } from './shared/toast/toast.component';
import { UserService } from './services/user.service';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login-v2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewChecked {


  confirmPass = false;
  registerForm: FormGroup;

  loginConfirmForm: FormGroup;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  email = new FormControl('', [
    Validators.required
  ]);
  password = new FormControl('', [
    Validators.required
  ]);
  confirm_password = new FormControl('', [
    Validators.required
  ]);

  confirmCode = new FormControl('', [
    Validators.required
  ]);

  loginForm: FormGroup;
  forgetForm: FormGroup;



  constructor(public auth: UserAuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private userService: UserService,
    private socialAuthService: AuthService,
    private changeDetector: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
  ngOnInit() {

    // this.getUserSetting();

    this.loginConfirmForm = this.formBuilder.group({
      confirmCode: this.confirmCode,
    });

    this.registerForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,
    }, {
        validator: this.userService.MatchPassword // your validation method
      });

    // if (this.auth.loggedIn) {
    //   this.router.navigate(['/']);
    // }
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });

    this.forgetForm = this.formBuilder.group({
      email: this.email
    });
  }

  confirmPassword(e) {
    try {
      if (this.registerForm.controls.confirm_password.errors.MatchPassword) {
        this.confirmPass = true;
      }
    } catch (t) {
      this.confirmPass = false;
    }
  }

  setClassUsername() {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }

  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }

  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }
  // Register
  register() {
    if (!this.registerForm.valid) { return false }
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        // debugger;
        this.toast.setMessage('Please verify your account. check your mail!', 'success');
        document.getElementById("closeSignupModal").click()
        // this.router.navigate(['/']);
      },
      error => { console.log(error); this.toast.setMessage('email already exists', 'danger') }
    );
  }


  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signOut();
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(userData);
        userData.name.split(" ")[0]
        let soscialUser = {
          email: userData.email,
          username: userData.name.split(" ")[0],
          fname: userData.name.split(" ")[0],
          lname: userData.name.split(" ")[1],
          provider: userData.provider,
          social_token: userData.id,
          status: "verified",
        }
        this.registerSocialUser(soscialUser);
      }
    );
  }

  registerSocialUser(soscialUser) {
    this.userService.registerSocialUser(soscialUser).subscribe(
      res => {
        if (this.auth.socialLogin(res)) {
          document.getElementById("closeLoginModal").click()
          this.router.navigate(['/'])
        }
      },
      error => { console.log(error); this.toast.setMessage('email already exists', 'danger') }
    );

  }

  setClassLoginEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }

  setClassLoginPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  // Login
  login() {
    this.auth.login(this.loginForm.value).subscribe(
      res => { },
      error => { if (error.error.msg) { this.toast.setMessage(error.error.msg, 'danger') } else { this.toast.setMessage('invalid email or password!', 'danger') } }
    );
  }

  confirmLoginUser() {
    if (this.auth.confirmLoginUser(this.loginConfirmForm.value)) {
      this.auth.loginSecondStep = false;
      document.getElementById("closeLoginModal").click()
      this.router.navigate(['/'])
    } else {
      this.toast.setMessage('Please enter valid code', 'danger')
    }

  }


  openForgetPassModal() {
    document.getElementById("closeLoginModal").click();
    document.getElementById("closeLoginModal").click();
  }

  //Forget
  forget() {
    if (!this.forgetForm.valid) { return false }
    this.userService.forgetUser(this.forgetForm.value).subscribe(
      res => {
        this.toast.setMessage('Please check your mail!', 'success');
        document.getElementById("closeSignupModal").click()
        // this.router.navigate(['/']);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }









}

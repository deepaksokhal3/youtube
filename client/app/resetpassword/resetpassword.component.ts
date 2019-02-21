import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  isLoading = true;
  confirmPass = false;
  userId;
  resetPassForm: FormGroup;

  password = new FormControl('', [
    Validators.required
  ]);
  confirm_password = new FormControl('', [
    Validators.required
  ]);

  constructor(public toast: ToastComponent,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.confirmForgetPassToken();
    this.resetPassForm = this.formBuilder.group({
      password: this.password,
      confirm_password: this.confirm_password,
    }, {
        validator: this.userService.MatchPassword // your validation method
      });
  }

  resetpass() {
    this.isLoading = true
    this.resetPassForm.value.id = this.userId;
    this.userService.resetPassword(this.resetPassForm.value).subscribe(
      res => {
        this.toast.setMessage('Password reset successfully', 'success');
        this.router.navigate(['/'])
      },
      error => console.log(error),
      () => this.isLoading = false
    );

  }
  confirmPassword(e) {
    try {
      if (this.resetPassForm.controls.confirm_password.errors.MatchPassword) {
        this.confirmPass = true;
      }
    } catch (t) {
      this.confirmPass = false;
    }
  }

  confirmForgetPassToken() {
    this.userService.confirmForgetPassToken(this.route.params['value'].id).subscribe(
      data => { this.userId = JSON.parse(data)._id },
      error => { this.toast.setMessage(error.msg, 'danger') },
      () => this.isLoading = false
    );
  }
}

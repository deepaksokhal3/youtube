import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { UserAuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss']
})
export class ChangepassComponent implements OnInit {

  isLoading = false;
  changePassForm: FormGroup;
  old = new FormControl('', Validators.required);
  newPass = new FormControl('', Validators.required);
  confirm = new FormControl('', Validators.required);
  constructor(private auth: UserAuthService,
    public toast: ToastComponent,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.changePassForm = this.formBuilder.group({
      old: this.old,
      newPass: this.newPass,
      confirm: this.confirm
    });
  }
  save() {
    if (this.changePassForm.valid) {
      this.changePassForm.value._id = this.auth.currentUser._id
      this.userService.changePassword(this.changePassForm.value).subscribe(
        res => {
          this.toast.setMessage(res.msg, 'success');
        },
        error => {
          this.toast.setMessage(error.error, 'danger');
        },
        () => this.isLoading = false
      );

    }
  }

}

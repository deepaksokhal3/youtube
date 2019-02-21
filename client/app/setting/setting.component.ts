import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersSettingService } from '../services/users-settings.service';
import { UserAuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  isLoading = true;
  settingEditEnable;
  settingFrom: FormGroup;
  allow_location = new FormControl(false, []);
  subscribe = new FormControl(false, []);
  link_youtube_account = new FormControl(false, []);
  two_step_verification = new FormControl(false, []);

  constructor(
    public toast: ToastComponent,
    private route: ActivatedRoute,
    private router: Router,
    private authService: UserAuthService,
    private userSettings: UsersSettingService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.settingFrom = this.formBuilder.group({
      allow_location: this.allow_location,
      subscribe: this.subscribe,
      link_youtube_account: this.link_youtube_account,
      two_step_verification: this.two_step_verification,
    });
    this.getSetting();
  }

  getSetting() {
    this.userSettings.getSetting(this.authService.currentUser._id).subscribe(
      res => {
        if (res != "null") {
          let data = JSON.parse(res);
          this.settingEditEnable = data._id;
          this.settingFrom.controls['allow_location'].setValue(data.allow_location);
          this.settingFrom.controls['link_youtube_account'].setValue(data.link_youtube_account);
          this.settingFrom.controls['subscribe'].setValue(data.subscribe);
          this.settingFrom.controls['two_step_verification'].setValue(data.two_step_verification);
        }
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }


  save() {
    this.isLoading = true
    if (!this.settingEditEnable) {
      this.settingFrom.value.user_id = this.authService.currentUser._id;
      this.userSettings.saveSetting(this.settingFrom.value).subscribe(
        res => this.toast.setMessage('Setting save successfully', 'success'),
        error => console.log(error),
        () => this.isLoading = false
      );
    } else {
      this.settingFrom.value._id = this.settingEditEnable;
      this.userSettings.updateSetting(this.settingFrom.value).subscribe(
        res => this.toast.setMessage('Setting update successfully', 'success'),
        error => console.log(error),
        () => this.isLoading = false
      );
    }
  }

}

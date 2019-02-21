import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ToastComponent } from '../shared/toast/toast.component';
import { UserAuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { GeoLocationService } from '../services/geo-location.service';
import { UsersSettingService } from '../services/users-settings.service';
import { User } from '../shared/models/user.model';
import { OptionsService } from '../services/options.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  user: User;
  isLoading = true;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  tagsInstrested;
  profilePicUrl: string;
  constructor(private auth: UserAuthService,
    public toast: ToastComponent,
    public cdr: ChangeDetectorRef,
    private geoLocationService: GeoLocationService,
    private optionsService: OptionsService,
    private usersSettingService: UsersSettingService,
    private userService: UserService,
    private loc: Location) { }

  ngOnInit() {
    this.getUser();
    this.getUserSetting();
    this.getTags();
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  getGeoLocationAddress() {
    try {
      if (this.geoLocationService.latitude) {
        let latlng = { lat: this.geoLocationService.latitude, lng: this.geoLocationService.longitude }
        this.geoLocationService.getGoogleAddress(latlng).subscribe(
          data => {
            if (data.length > 0) {
              this.user.state = data[0].administrativeLevels.level1long
              this.user.city = data[0].city
              this.user.country = data[0].country
              this.user.zip_code = data[0].zipcode
            }
          },
          error => console.log(error),
          () => this.isLoading = false
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getUserSetting() {
    if (this.auth.loggedIn) {
      this.usersSettingService.getSetting(this.auth.currentUser._id).subscribe(
        res => {
          if (res != "null") {
            let data = JSON.parse(res);
            if (data.allow_location)
              this.getGeoLocationAddress();
          }
        },
        error => console.log(error),
      );
    }
  }

  getTags() {
    this.optionsService.getTags().subscribe(
      data => { this.dropdownList = data; },
      error => console.log(error),
    );
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => {
        this.user = data;
        try {
          this.selectedItems = JSON.parse(data.tags);
        } catch (r) {

        }
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  file
  save(user: User) {
    if (this.profilePicUrl) { user.prifile_pic = this.profilePicUrl }
    user.tags = JSON.stringify(this.selectedItems);
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
  }

  onSelectFile(event, user: User) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.userService.uploadProfile({ _id: user._id, base64Image: event.target.result }).subscribe(
          data => { this.profilePicUrl = data.imageUrl; },
          error => console.log(error),
          () => this.isLoading = false
        );

      }
    }
  }

}

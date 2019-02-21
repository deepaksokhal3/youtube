import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private auth: UserAuthService) { }

  ngOnInit() {
    this.auth.logout();
  }

}

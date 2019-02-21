import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { ConfirmService } from '../services/confirm.service';
import { Token } from '../shared/models/confirm.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  token: Token;
  isLoading = true;
  constructor(public toast: ToastComponent,
    private confirmService: ConfirmService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.confirmUser();
    this.test();
  }

  confirmUser() {
    this.confirmService.confirmUser(this.route.params['value'].id).subscribe(
      data => { },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  test() {
    this.confirmService.getyoutube().subscribe(
      data => { debugger; },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { UserAuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  isLoading = false;
  contactForm: FormGroup;
  email = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  subject = new FormControl('', Validators.required);

  constructor(private auth: UserAuthService,
    public toast: ToastComponent,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      email: this.email,
      description: this.description,
      subject: this.subject
    });
  }

  send() {
    this.userService.sendMail(this.contactForm.value).subscribe(
      data => {
        console.log(data)
        this.toast.setMessage('send successfully.', 'success');
      },
      error => this.toast.setMessage('Please send again.', 'danger')
    );
  }

}

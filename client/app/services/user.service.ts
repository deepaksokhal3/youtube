import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { User } from '../shared/models/user.model';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/user', user);
  }

  registerSocialUser(user: User): Observable<User> {
    return this.http.post<User>('/api/socialuser', user);
  }

  login(credentials): Observable<any> {
    return this.http.post('/api/login', credentials);
  }

  uploadProfile(Image): Observable<any> {
    return this.http.post('/api/upload', Image);
  }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  countUsers(): Observable<number> {
    return this.http.get<number>('/api/users/count');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('/api/user', user);
  }

  getUser(user: User): Observable<any> {
    return this.http.get<any>(`/api/user/${user._id}`);
  }

  editUser(user: User): Observable<any> {
    return this.http.put(`/api/user/${user._id}`, user, { responseType: 'text' });
  }

  sendMail(obj): Observable<any> {
    return this.http.post<any>('/api/send', obj);
  }

  forgetUser(user: User): Observable<any> {
    return this.http.post(`/api/forget`, user, { responseType: 'text' });
  }

  confirmForgetPassToken(user: User): Observable<any> {
    return this.http.post(`/api/resetpassword`, { token: user }, { responseType: 'text' });
  }
  resetPassword(user: User): Observable<any> {
    return this.http.put(`/api/setpassword`, user, { responseType: 'text' });
  }

  changePassword(user: User): Observable<any> {
    return this.http.put(`/api/changepassword`, user, { responseType: 'text' });
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete(`/ api / user / ${user._id}`, { responseType: 'text' });
  }
  MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirm_password').value; // to get value in input tag
    if (password != confirmPassword) {
      AC.get('confirm_password').setErrors({ MatchPassword: true });
    } else {
      return false;
    }
  }

}

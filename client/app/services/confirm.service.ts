import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { Token } from '../shared/models/confirm.model';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private http: HttpClient) { }
  confirmUser(token: Token): Observable<any> {
    return this.http.post(`/api/confirmation/${token}`, { token: token }, { responseType: 'text' });
  }

  getyoutube(): Observable<any> {
    return this.http.get(`/api/youtube/`, { responseType: 'text' });
  }
}

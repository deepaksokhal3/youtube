import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { UserSetting } from '../shared/models/user_settings.model';

@Injectable({
    providedIn: 'root'
})
export class UsersSettingService {

    constructor(private http: HttpClient) { }
    saveSetting(setting: UserSetting): Observable<UserSetting> {
        return this.http.post<UserSetting>('/api/userSetting', setting);
    }

    getSetting(userId: String): Observable<any> {
        return this.http.get(`/api/userSetting/${userId}`, { responseType: 'text' });
    }
    updateSetting(userSetting: UserSetting): Observable<any> {
        return this.http.put(`/api/userSettings/${userSetting._id}`, userSetting, { responseType: 'text' });
    }
}

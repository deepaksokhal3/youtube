import { Injectable, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { UsersSettingService } from './users-settings.service';

@Injectable()

export class GeoLocationService {

    public latitude: number;
    public longitude: number;
    constructor(
        private ngZone: NgZone, private http: HttpClient) { }

    allowCurrentLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
            });
        }
    }

    getGoogleAddress(LatLng): Observable<any> {
        return this.http.get(`/api/googleAddress?lat=${LatLng.lat}&lng=${LatLng.lng}`);
    }
}
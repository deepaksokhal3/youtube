import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class CommonService {

    constructor(private http: HttpClient) { }



}


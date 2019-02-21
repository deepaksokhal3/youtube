import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Recipe } from '../shared/models/recipe.model';

@Injectable()
export class VideoService {

    constructor(private http: HttpClient) { }

    getVideoInfo(recipe: String): Observable<any> {
        return this.http.post<String>(`/api/youtubevideoinfo`, { url: recipe });
    }



}

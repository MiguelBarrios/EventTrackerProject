import { Exerciseset } from './../models/exerciseset';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private url = environment.baseUrl + 'api/exerciseset';
  constructor(private http:HttpClient) { }

  index(){
    return this.http.get<Exerciseset[]>(this.url)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error in WorkoutService.index()');
        })
      )
  }
}

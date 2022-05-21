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

 add(item:Exerciseset){
    return this.http.post<Exerciseset>(this.url, item)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error in WorkoutService.add()');
        })
      )
  }

  update(item:Exerciseset){
    return this.http.put<Exerciseset>(this.url + "/" + item.id, item)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error in WorkoutService.update()');
        })
      )
  }

  delete(id:number){
    return this.http.delete<void>(this.url + "/" + id)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error in WorkoutService.delete()');
        })
      )
  }

  getStats(){
    return this.http.get<Object>(this.url + "/" + "stats")
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error in WorkoutService.getStats()');
        })
      )
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private url = environment.baseUrl + 'api/exerciseset';
  constructor(private http:HttpClient) { }


}

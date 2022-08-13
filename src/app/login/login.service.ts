import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  onLogin(data){
    return this.http.post('http://localhost:8080/api/auth/signin', data)
    .subscribe(response => {
      console.log(response);
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private router: Router,
    private auth: AuthService
  ) { }

  onLogin(data){
    return this.http.post('http://localhost:8080/api/auth/signin', data)
    .subscribe(response => {
      localStorage.setItem("id_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYwNDE2NTcyLCJleHAiOjE2NjA1MDI5NzJ9.vXM7w1iKI1nvp_lRGizsgZc3EoQCbPbyNMiVuP8LPGQ")
      this.router.navigate(['my-profile']);
    });
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
}

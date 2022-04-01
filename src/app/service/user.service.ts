import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { tap } from "rxjs/operators";
import { Login } from "../login/models/login.model";
import { JwtToken } from "../login/models/jwt.model";
import { Register } from "../register/models/register.model";

@Injectable({ providedIn: 'root' })
export class UserService {

  isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  authenticate(loginData: Login): Observable<any> {
    const url = `${environment.apiUrl}authenticate/login`;
    return this.httpClient.post<JwtToken>(url, loginData)
      .pipe(tap(responseData => {
        const token = responseData.token;
        localStorage.setItem('token', token);
        this.isAuthenticated.next(true);
        console.log("token" + token);
      }));
  }

  register(data: Register): Observable<void> {
    const url = `${environment.apiUrl}authenticate/register`;
    return this.httpClient.post<void>(url, data);
  }

  adminRegister(data: Register, key: String): Observable<void> {
    const url = environment.apiUrl + "authenticate/register-admin?Authorization="+ key;
    return this.httpClient.post<void>(url, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
  }
}

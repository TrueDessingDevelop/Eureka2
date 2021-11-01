import { HttpClient ,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Auth } from '../model/auth';
import { Login } from '../model/login';
import { Register } from '../model/register';
import { Session } from '../model/session';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
  
})
export class AuthService {
  REST_API: string = 'http://localhost:8080/api/auth';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient,public jwtHelper: JwtHelperService) {}


  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token') as string;
    console.log(token);
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(loginObj: Login): Observable<Auth> {
    let API_URL = `${this.REST_API}/login`;
    return this.httpClient.post(API_URL, loginObj)
    .pipe(map((res: any) => {
      return res || {}
    }),
      catchError(this.handleError)
    )
  }

  register(register: Register): Observable<Auth> {
    let API_URL = `${this.REST_API}/register`;
    return this.httpClient.post(API_URL, register)
    .pipe(map((res: any) => {
      return res || {}
    }),
      catchError(this.handleError)
    )
  }

  logout(): Observable<Boolean> {
    let API_URL = `${this.REST_API}/logout`;
    return this.httpClient.post(API_URL, {})
    .pipe(map((res: any) => {
      return res || {}
    }),
      catchError(this.handleError)
    )
  }
 
  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
 }
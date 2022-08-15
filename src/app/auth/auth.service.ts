import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQqeVgSlFHGIQNUKQDwYV2DvjdaoE-QNM',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(catchError(e => {
      let errorMessage = 'An unknown error occurred!';
      if (!e.error || !e.error.error) {
        return throwError(()=> new Error(errorMessage));
      }
      switch (e.error.error.message) {
        case 'EMAIL_EXISTS': 
          errorMessage = 'This email already exists.';
      }
      return throwError(()=> new Error(errorMessage));
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQqeVgSlFHGIQNUKQDwYV2DvjdaoE-QNM',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
  }
}

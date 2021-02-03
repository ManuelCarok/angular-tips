import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HandleHttpResponseError } from '@core/utils/http-handle';

// Se puede usar http://json2ts.com/

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
      map(users => users as User[])
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`).pipe(
      retry(2),
      catchError(HandleHttpResponseError),
      map(users => {
        return users as User;
      })
    );
  }

  getUserById2(id: string): Observable<Partial<User>> {
    return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`).pipe(
      retry(3),
      catchError(err => {
        // Toast
        return throwError(`Mi mensaje de error: ${err.message}`);
      }),
      map((users: User) => ({ name: users.name }) as Partial<User>)
    );
  }


  getDataMap() {
    return;
  }
}

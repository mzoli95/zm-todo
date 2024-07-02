import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import {
  EmailAddress,
  EmailAddressDTO,
  TodoDTO,
  TodoItems,
} from '../../model/todoDto.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  postTodo(data: TodoItems) {
    return this.http
      .post('http://localhost:5168/api/todo/createtodo', data)
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error(error.message || 'Valami hiba történt')
          );
        })
      );
  }

  updateTodo(data: TodoItems) {
    return this.http
      .put(`http://localhost:5168/api/todo/updatetodo/${data.id}`, data)
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error(error.message || 'Valami hiba történt')
          );
        })
      );
  }

  deleteComment(id: number, commentId: number): Observable<any> {
    return this.http
      .delete(
        `http://localhost:5168/api/todo/delete/${id}/comment/${commentId}`
      )
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error(error.message || 'Valami hiba történt')
          );
        })
      );
  }

  deleteTodo(id: string): Observable<any> {
    return this.http
      .delete(`http://localhost:5168/api/todo/deletetodo/${id}`)
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error(error.message || 'Valami hiba történt')
          );
        })
      );
  }

  getTodoById(id: number): Observable<any> {
    id;
    return this.http
      .get<TodoItems>(`http://localhost:5168/api/todo/${id}`)
      .pipe(
        map((data) => {
          return {
            ...data,
          };
        }),
        catchError((error) => {
          return throwError(
            () => new Error(error.message || 'Valami hiba történt')
          );
        })
      );
  }

  getUsers(searchTerm: string): Observable<EmailAddress[]> {
    const url = `http://localhost:5168/api/todo/emaillist?search=${searchTerm}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        if (response && response.emails) {
          return response.emails.map((item: EmailAddress) => ({
            id: item.id,
            email: item.email,
            displayName: item.displayName,
          }));
        } else {
          return [];
        }
      })
    );
  }

  getTodoList(
    pageIndex: number = 0,
    pageSize: number = 10,
    sortBy: string = 'title',
    sortDirection: string = 'desc',
    search = ''
  ): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', (pageIndex + 1).toString())
      .set('pageSize', pageSize.toString());
    //TODO
    //   .set('sortBy', sortBy)
    //   .set('isDescending', (sortDirection === 'desc').toString());
    //   .set('search', search);

    return this.http
      .get<TodoDTO[]>('http://localhost:5168/api/todo/list', {
        params,
      })
      .pipe(
        map((data) => {
          return {
            ...data,
          };
        })
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as TodoActions from './+state/todo.actions';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ListComponent } from './list/list.component';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'zm-todo',
  standalone: true,
  imports: [ListComponent, MatLabel, MatPaginator, MatFormField, MatIcon],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  constructor(private store: Store) {}
  totalRecords?: number;

  ngOnInit(): void {
    this.store.dispatch(TodoActions.getTodoList());
  }

  createTodo(): void {
    this.store.dispatch(TodoActions.isCreate({ isCreate: true }));
  }
}

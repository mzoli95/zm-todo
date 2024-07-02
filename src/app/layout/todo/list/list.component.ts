import { Component, OnInit, ViewChild, computed } from '@angular/core';
import { SubscriptionManager } from '../../../utils/subscriptionManager';
import { Observable } from 'rxjs';
import * as TodoActions from '../+state/todo.actions';
import * as TodoSelectors from '../+state/todo.selectors';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { TodoItems } from '../../../model/todoDto.interface';
import { EnumMapperPipe } from '../../../shared/pipe/enumMapper.pipe';
import { Priority, Stage } from '../../../model/mz.enums';
import { PriorityColorDirective } from '../../../shared/directive/priorityColor.directive';

@Component({
  selector: 'zm-todo-list',
  standalone: true,
  imports: [
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    EnumMapperPipe,
    PriorityColorDirective,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends SubscriptionManager implements OnInit {
  constructor(private store: Store) {
    super();
  }
  dataSource$: Observable<TodoItems[]> = this.store.select(
    TodoSelectors.selectTodoList
  );

  displayedColumns: string[] = [
    'title',
    'description',
    'deadline',
    'priority',
    'stage',
    'createdBy',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  StageType = Stage;
  PriorityType = Priority;

  ngOnInit(): void {}

  deleteTodo(id: string) {
    if (id !== undefined) {
      this.store.dispatch(TodoActions.deleteTodo({ id }));
    }
  }
  modifyTodo(id: number) {
    if (id !== undefined) {
      this.store.dispatch(TodoActions.getUpdateTodo({ id }));
    }
  }
  onPageChange(asd: any) {}
}

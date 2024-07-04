import { Component, OnInit } from '@angular/core';
import {
  Comments,
  TodoCommentItems,
} from '../../../../../model/todoDto.interface';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { SubscriptionManager } from '../../../../../utils/subscriptionManager';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import * as TodoActions from '../../../+state/todo.actions';
import * as TodoSelectors from '../../../+state/todo.selectors';
import { MatIconModule } from '@angular/material/icon';

type TodoCommentsForm = Record<keyof Comments, FormControl>;

@Component({
  selector: 'zm-todo-stepper-comment',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    DatePipe,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent extends SubscriptionManager implements OnInit {
  commentControl: TodoCommentsForm = {
    id: new FormControl(null),
    createdAt: new FormControl(null),
    createdBy: new FormControl(null),
    todoId: new FormControl(null),
    text: new FormControl(null),
  };
  form = new FormGroup(this.commentControl);

  comments$: Observable<Comments[]> = this.store.select(
    TodoSelectors.selectComments
  );

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {}

  onCreateComment(): void {
    this.store.dispatch(
      TodoActions.todoCommentPost({
        value: this.commentControl['text'].value ?? '',
      })
    );
    this.form.reset();
  }

  onDeleteComment(id: number, commentId: number): void {
    this.store.dispatch(
      TodoActions.deleteConfirmationComment({ id, commentId })
    );
  }
}

import { Component, OnInit, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as TodoSelectors from '../+state/todo.selectors';
import * as TodoActions from '../+state/todo.actions';
import { SubscriptionManager } from '../../../utils/subscriptionManager';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { MatCardModule } from '@angular/material/card';
import { StepperFormComponent } from './stepper/stepper-form.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TabFormComponent } from './tab/tab-form.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'zm-todo-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    TabFormComponent,
    StepperFormComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent extends SubscriptionManager implements OnInit {
  isCreate = input.required<boolean>();

  isCreateText = computed(() => {
    return this.isCreate() ? 'Create' : 'Modify';
  });

  currentStep = 0;

  currentStep$: Observable<number> = this.store.select(
    TodoSelectors.selectCurrentStep
  );

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<CreateComponent | EditComponent>
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscriptions(
      this.currentStep$.subscribe((step) => {
        this.currentStep = step;
      })
    );
  }

  goBack(): void {
    this.store.dispatch(TodoActions.previousTodoComponent());
  }

  goForward(): void {
    this.store.dispatch(TodoActions.nextTodoComponent());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  postTodo(): void {
    this.store.dispatch(TodoActions.postTodoForm());
    this.dialogRef.close();
  }

  updateTodo(): void {
    this.store.dispatch(TodoActions.updateTodoForm());
    this.dialogRef.close();
  }
}

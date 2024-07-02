import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatLabel,
  MatFormField,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { EnumMapperPipe } from '../../../../../shared/pipe/enumMapper.pipe';
import { SubscriptionManager } from '../../../../../utils/subscriptionManager';
import { Priority } from '../../../../../model/mz.enums';
import { TodoBasicItems } from '../../../../../model/todoDto.interface';
import { Store, select } from '@ngrx/store';
import * as TodoActions from '../../../+state/todo.actions';
import * as TodoSelectors from '../../../+state/todo.selectors';
import { take } from 'rxjs';

type TodoBasicForm = Record<keyof TodoBasicItems, FormControl>;

@Component({
  selector: 'zm-todo-stepper-basic',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatOption,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    EnumMapperPipe,
  ],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.scss',
})
export class BasicComponent extends SubscriptionManager implements OnInit {
  constructor(private store: Store) {
    super();
  }

  prioritiesEnum = Object.values(Priority);

  todoBasicFormControls: TodoBasicForm = {
    title: new FormControl(null),
    description: new FormControl(null),
    priority: new FormControl(null),
  };
  form = new FormGroup(this.todoBasicFormControls);

  ngOnInit(): void {
    this.store
      .pipe(select(TodoSelectors.selectBasicInfo), take(1))
      .subscribe((basicForm: TodoBasicItems) => {
        this.form.patchValue(basicForm);
      });

    this.addSubscriptions(
      this.form.valueChanges.subscribe((values) => {
        this.store.dispatch(
          TodoActions.todoBasicFormChanges({
            value: values,
            isValidForm: this.form.valid,
          })
        );
      })
    );
  }
}

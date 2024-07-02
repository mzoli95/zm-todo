import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EnumMapperPipe } from '../../../../../shared/pipe/enumMapper.pipe';
import {
  EmailAddress,
  TodoAdditionalItems,
  TodoAssignedToEmailAddressDTO,
} from '../../../../../model/todoDto.interface';
import { SubscriptionManager } from '../../../../../utils/subscriptionManager';
import { Stage, Tag } from '../../../../../model/mz.enums';
import { Store, select } from '@ngrx/store';
import * as TodoActions from '../../../+state/todo.actions';
import * as TodoSelectors from '../../../+state/todo.selectors';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { debounceTime, distinctUntilChanged, switchMap, take } from 'rxjs';
import { TodoService } from '../../../todo.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MultiSelectModule } from 'primeng/multiselect';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'zm-todo-stepper-additional',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    EnumMapperPipe,
    MatAutocompleteModule,
    CommonModule,
    MultiSelectModule,
    MatChipsModule,
    MatIconModule,
    FloatLabelModule,
  ],
  templateUrl: './additional.component.html',
  styleUrl: './additional.component.scss',
})
export class AdditionalComponent extends SubscriptionManager implements OnInit {
  constructor(private store: Store, private service: TodoService) {
    super();
  }

  stagesEnum = Object.values(Stage);
  tagsEnum = Object.values(Tag);
  users: EmailAddress[] = [];
  assignedUsers: EmailAddress[] = [];

  ownedForm: Record<keyof EmailAddress, FormControl> = {
    email: new FormControl(null),
    displayName: new FormControl(null),
    id: new FormControl(null),
  };

  // Inicializáljuk az assignedToForm-ot és az assignedToArray-t
  assignedToForm: Record<keyof EmailAddress, FormControl> = {
    email: new FormControl(null),
    displayName: new FormControl(null),
    id: new FormControl(null),
  };

  assignedToArray = new FormArray([]);

  todoAdditionalFormControls: Record<keyof any, AbstractControl> = {
    deadline: new FormControl(null),
    stage: new FormControl(null),
    tags: new FormControl(null),
    owned: new FormGroup(this.ownedForm),
    assignedTo: new FormArray([]),
  };

  form = new FormGroup(this.todoAdditionalFormControls);
  ownedFormGroup = new FormGroup(this.ownedForm);
  assignedToFormGroup = new FormGroup(this.assignedToForm);
  ngOnInit(): void {
    this.store
      .pipe(select(TodoSelectors.selectAdditionalInfo), take(1))
      .subscribe((additionalForm: TodoAdditionalItems) => {
        const transformedTags = additionalForm.tags.map((tag) => tag.name);
        this.form.patchValue({
          ...additionalForm,
          tags: transformedTags,
        });
      });

    this.store
      .pipe(select(TodoSelectors.selectAssignedToForm), take(1))
      .subscribe((assignedToForms: TodoAssignedToEmailAddressDTO[]) => {
        this.assignedUsers = assignedToForms.map((assignedTo) => ({
          id: assignedTo.id,
          email: assignedTo.email,
          displayName: assignedTo.displayName,
        }));

        this.assignedToFormGroup.patchValue({
          email: this.assignedUsers,
        });
      });

    this.store
      .pipe(select(TodoSelectors.selectOwners), take(1))
      .subscribe((emailForm: EmailAddress) => {
        this.ownedFormGroup.patchValue({
          ...emailForm,
        });
      });

    this.addSubscriptions(
      this.form.valueChanges
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((values) => {
          this.store.dispatch(
            TodoActions.todoAdditionalFormChanges({
              value: values,
              isValidForm: this.form.valid,
            })
          );
        }),
      this.assignedToForm.email.valueChanges.subscribe((values) => {
        this.store.dispatch(
          TodoActions.todoAdditionalAssignedToFormChanges({
            value: values,
          })
        );
      })
    );

    this.ownedForm.email.valueChanges
      .pipe(
        debounceTime(1000),
        switchMap((value: string) => {
          if (typeof value === 'string') {
            if (value.trim().length === 0) {
              return [];
            }
            return this.service.getUsers(value).pipe(take(1));
          }
          return [];
        })
      )
      .subscribe((users: EmailAddress[]) => {
        this.users = users;
      });
  }

  onUserSelected(event: any) {
    const selectedUser: EmailAddress = event.option.value;
    this.ownedFormGroup.patchValue(selectedUser);
    this.store.dispatch(
      TodoActions.todoAdditionalOwnedFormChanges({
        value: selectedUser,
      })
    );
  }

  getUsers(value: any) {
    const filteredValue = value.filter;
    this.service
      .getUsers(filteredValue)
      .pipe(debounceTime(1000))
      .subscribe((users: EmailAddress[]) => {
        if (typeof filteredValue === 'string') {
          if (filteredValue.trim().length === 0) {
            this.assignedUsers = [];
          }
          this.assignedUsers = users;
        } else {
          this.assignedUsers = [];
        }
      });
  }
}

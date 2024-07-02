import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import {
  EmailAddress,
  TodoAssignedToEmailAddressDTO,
  TodoItems,
} from '../../../model/todoDto.interface';
import { Priority, Stage, Tag } from '../../../model/mz.enums';
import { __values } from 'tslib';

export const TODO_FEATURE_KEY = 'todo';

export interface TodoFormState {
  todos?: TodoItems[];
  totalRecords: number;
  currentTodo: TodoItems;
  isLoading: boolean;
  isCreate: boolean;
  isValidForm: boolean;
  currentStep: number;
}

export const todoListInitialState: TodoFormState = {
  todos: [],
  totalRecords: 0,
  currentTodo: {
    id: 0,
    completed: false,
    createdAt: new Date(),
    createdBy: 'User',
    deadline: new Date(),
    description: 'Desc',
    priority: Priority.Low,
    stage: Stage.InProgress,
    title: 'Title',
    owned: { id: 0, displayName: 'Teszt', email: 'Teszt' },
    tags: [
      {
        id: 0,
        todoId: 0,
        name: Tag.Test,
      },
    ],
    comments: [],
    assignedTo: [],
  },
  isLoading: false,
  isCreate: false,
  isValidForm: false,
  currentStep: 0,
};

export const todoListReducer = createReducer(
  todoListInitialState,
  on(TodoActions.loadTodoList, (state, { data }) => {
    return {
      ...state,
      isLoading: false,
      todos: data.todos,
      totalRecords: data.totalRecords,
    };
  }),
  on(TodoActions.isCreate, (state, { isCreate }) => ({
    ...state,
    isCreate: isCreate,
  })),
  on(TodoActions.deleteCommentSuccess, (state, { commentId }) => ({
    ...state,
    currentTodo: {
      ...state.currentTodo,
      comments: state.currentTodo.comments.filter(
        (comment) => comment.id !== commentId
      ),
    },
  })),
  on(TodoActions.todoBasicFormChanges, (state, { value, isValidForm }) => {
    return {
      ...state,
      isValidForm: isValidForm,
      currentTodo: {
        ...state.currentTodo,
        ...value,
      },
    };
  }),
  on(TodoActions.todoAdditionalOwnedFormChanges, (state, { value }) => {
    return {
      ...state,
      currentTodo: {
        ...state.currentTodo,
        owned: {
          ...value,
        },
        assignedTo: {
          ...state.currentTodo.assignedTo,
        },
      },
    };
  }),

  on(TodoActions.todoAdditionalAssignedToFormChanges, (state, { value }) => {
    const assignedTo: TodoAssignedToEmailAddressDTO[] = value.map((email) => ({
      id: state.currentTodo.id,
      todoId: state.currentTodo.id,
      email: email.email,
      displayName: email.displayName,
    }));
    return {
      ...state,
      currentTodo: {
        ...state.currentTodo,
        assignedTo: assignedTo,
      },
    };
  }),
  on(TodoActions.todoAdditionalFormChanges, (state, { value, isValidForm }) => {
    return {
      ...state,
      isValidForm: isValidForm,
      currentTodo: {
        ...state.currentTodo,
        ...value,
        tags: value?.tags
          ? // TODO check enum type
            value.tags.map((enumValue: any, index: number) => ({
              id: index + 1,
              todoId: state.currentTodo.id,
              name: enumValue,
            }))
          : [],
        assignedTo: {
          ...state.currentTodo.assignedTo,
        },
      },
    };
  }),
  on(TodoActions.todoCommentReducerModify, (state, { modifiedComment }) => {
    const newComment = {
      ...modifiedComment,
      todoId: state.currentTodo.id,
    };
    const updatedTodo = {
      ...state.currentTodo,
      comments: [...state.currentTodo.comments, newComment],
    };
    return {
      ...state,
      currentTodo: updatedTodo,
    };
  }),
  on(TodoActions.nextTodoComponentSuccess, (state) => ({
    ...state,
    currentStep: state.currentStep + 1,
  })),
  on(TodoActions.previousTodoComponent, (state) => ({
    ...state,
    currentStep: state.currentStep - 1,
  })),
  on(TodoActions.setCurrentTodo, (state, { data }) => {
    return {
      ...state,
      currentTodo: data,
    };
  })
);

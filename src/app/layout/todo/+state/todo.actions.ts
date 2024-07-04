import { createAction, props } from '@ngrx/store';
import { TodoFormState } from './todo.reducer';
import {
  Comments,
  EmailAddress,
  TodoAdditionalItems,
  TodoBasicItems,
  TodoCommentItems,
  TodoItems,
} from '../../../model/todoDto.interface';

export const loadTodoList = createAction(
  '[Todo] Load Todo List',
  props<{ data: TodoFormState; token: string }>()
);

export const getTodoList = createAction(
  '[Todo] Get Todo List',
  (
    props: {
      pageNumber?: number;
      pageSize?: number;
      sortBy?: string;
      isDescending?: string;
      search?: string;
    } = {}
  ) => ({ ...props })
);

export const openDialog = createAction('[Todo] Open Dialog');
export const closeDialog = createAction(
  '[Todo] Close Dialog',
  props<{ isCreate: boolean }>()
);

export const getTodoListSuccess = createAction(
  '[Todo] Get Todo List Succeeded'
);

export const todoError = createAction(
  '[Todo] Error',
  props<{ error: string }>()
);

export const isCreate = createAction(
  '[Todo] Set isCreate',
  props<{ isCreate: boolean }>()
);

export const todoErrorHandling = createAction('[Todo] Error handling');

export const todoBasicFormChanges = createAction(
  '[Todo] Todo Basic Form Changes',
  props<{ value: Partial<TodoBasicItems>; isValidForm: boolean }>()
);
export const todoAdditionalFormChanges = createAction(
  '[Todo] Todo Additional Form Changes',
  props<{ value: Partial<TodoAdditionalItems>; isValidForm: boolean }>()
);

export const todoAdditionalOwnedFormChanges = createAction(
  '[Todo] Todo Additional Owned Form Changes',
  props<{ value: EmailAddress }>()
);
export const todoAdditionalAssignedToFormChanges = createAction(
  '[Todo] Todo Additional Assigned To Form Changes',
  props<{ value: EmailAddress[] }>()
);

export const todoCommentPost = createAction(
  '[Todo] Todo Comment Post',
  props<{ value: string }>()
);

export const todoCommentReducerModify = createAction(
  '[Todo] Todo Comment Post Reducer Modify',
  props<{ modifiedComment: Comments }>()
);

export const postTodoForm = createAction('[Todo] Post Todo Form');
export const postTodoFormSuccess = createAction(
  '[Todo] Post Todo Form Success'
);
export const updateTodoForm = createAction('[Todo] Update Todo Form');
export const updateTodoFormSuccess = createAction(
  '[Todo] Update Todo Form Success'
);

export const deleteTodoConfirmation = createAction(
  '[Todo] Delete Todo Confirmation',
  props<{ id: string }>()
);

export const deleteTodoSuccess = createAction('[Todo] Delete Todo Success');
export const getUpdateTodo = createAction(
  '[Todo] Get Update Todo',
  props<{ id: number }>()
);
export const getUpdateTodoSuccess = createAction(
  '[Todo] Get Update Todo Success'
);

export const setCurrentTodo = createAction(
  '[Todo] Set Current Todo',
  props<{
    data: TodoItems;
  }>()
);

export const nextTodoComponent = createAction('[Todo] Next Todo Component');
export const previousTodoComponent = createAction(
  '[Todo] Previous Todo Component'
);

export const nextTodoComponentSuccess = createAction('[Todo] Step++');
export const previousTodoComponentSuccess = createAction('[Todo] Step--');

export const deleteConfirmationComment = createAction(
  '[Todo] Delete Comment',
  props<{ id: number; commentId: number }>()
);
export const deleteCommentSuccess = createAction(
  '[Todo] Delete Comment Success',
  props<{ commentId: number }>()
);

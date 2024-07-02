import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TODO_FEATURE_KEY, TodoFormState } from './todo.reducer';

export const selectTodoFormFeature =
  createFeatureSelector<TodoFormState>(TODO_FEATURE_KEY);

export const selectTodoList = createSelector(
  selectTodoFormFeature,
  (state: TodoFormState) => state.todos ?? []
);

export const selectPostTodoForm = createSelector(
  selectTodoFormFeature,
  (state: TodoFormState) => state.currentTodo
);

export const selectComments = createSelector(
  selectTodoFormFeature,
  (state: TodoFormState) => state.currentTodo?.comments
);

export const selectCurrentStep = createSelector(
  selectTodoFormFeature,
  (state: TodoFormState) => state.currentStep
);

export const selectAdditionalInfo = createSelector(
  selectTodoFormFeature,
  (state: TodoFormState) => {
    return {
      deadline: state.currentTodo.deadline,
      stage: state.currentTodo.stage,
      tags: state.currentTodo.tags,
    };
  }
);
export const selectOwners = createSelector(
  selectTodoFormFeature,
  (state: TodoFormState) => {
    return state.currentTodo.owned;
  }
);

export const selectBasicInfo = createSelector(
  selectTodoFormFeature,
  (state: TodoFormState) => {
    return {
      title: state.currentTodo.title,
      description: state.currentTodo.description,
      priority: state.currentTodo.priority,
    };
  }
);

export const selectCommentInfo = createSelector(
  selectTodoFormFeature,
  (state: TodoFormState) => {
    return {
      title: state.currentTodo.title,
      description: state.currentTodo.description,
      priority: state.currentTodo.priority,
    };
  }
);

export const selectAssignedToForm = createSelector(
  selectTodoFormFeature,
  (state: TodoFormState) => state.currentTodo.assignedTo
);

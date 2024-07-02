# Todo Frontend (Angular 18) V1.0

This Angular application integrates ngrx for state management, Firebase for authentication, and various services to manage Todo items. Below are the key functionalities implemented:

## Technologies Used
- Angular 18
- ngrx (Effects, Actions, Selectors)
- Firebase Authentication
- Material Design Components (Angular Material)
- PrimeNG for Notifications
- Custom Services for Todo Management

## Functionality Overview

### 1. Get Todo List
**Effect:** `getTodoList$`

**Description:** Retrieves a paginated list of Todo items from the backend service. It uses Firebase token authentication (this.authService.getToken()) to authorize the request.

```typescript
getTodoList$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TodoActions.getTodoList),
    mergeMap((data) =>
      from(this.authService.getToken()).pipe(
        mergeMap((token) =>
          this.service
            .getTodoList(
              data.pageNumber,
              data.pageSize,
              data.sortBy,
              data.isDescending
            )
            .pipe(
              map((data: TodoFormState) =>
                TodoActions.loadTodoList({ data, token: token ?? '' })
              ),
              catchError((error) =>
                of(TodoActions.todoError({ error: error.message }))
              )
            )
        )
      )
    )
  )
);
```

### 2. Update Todo Form
**Effect:** `updateForm$`

**Description:** Handles the update of an existing Todo item. Upon receiving the `updateTodoForm` action, it retrieves the updated form data from the store (`selectPostTodoForm`) and sends it to the `TodoService` for updating the Todo item in the backend.

```typescript
updateForm$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TodoActions.updateTodoForm),
    withLatestFrom(this.store.select(TodoSelectors.selectPostTodoForm)),
    mergeMap(([_, data]) => {
      return this.service.updateTodo(data).pipe(
        map(() => TodoActions.updateTodoFormSuccess()),
        catchError((error) => of(TodoActions.todoError({ error })))
      );
    })
  )
);
```

### 3. Submit Todo Form
**Effect:** `submitForm$`

**Description:** Handles the submission of a new Todo item. Upon receiving the postTodoForm action, it modifies the incoming data (adds createdAt, createdBy, etc.), then calls the TodoService to create the Todo item.

```typescript
submitForm$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TodoActions.postTodoForm),
    withLatestFrom(this.store.select(TodoSelectors.selectPostTodoForm)),
    mergeMap(([_, data]) => {
      const currentUser = this.authService.currentUser$ig();
      const modifiedData = {
        ...data,
        id: 0,
        completed: false,
        createdAt: new Date(),
        createdBy: currentUser!.email,
      };

      return this.service.postTodo(modifiedData).pipe(
        map(() => TodoActions.postTodoFormSuccess()),
        catchError((error) => of(TodoActions.todoError({ error })))
      );
    })
  )
);
```

### 4. Handle Todo Comments
**Effect:** `commentForm$`

**Description:** Manages the addition of comments to a Todo item. Upon receiving the todoCommentPost action, it constructs a new Comments object with user information and dispatches it to update the state.

```typescript
commentForm$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TodoActions.todoCommentPost),
    mergeMap((data) => {
      const currentUser = this.authService.currentUser$ig();
      const modifiedData: Comments = {
        text: data.value,
        todoId: 0,
        createdAt: new Date(),
        createdBy: currentUser!.email,
      };
      return of(
        TodoActions.todoCommentReducerModify({
          modifiedComment: modifiedData,
        })
      );
    })
  )
);
```

### 5. Error Handling
**Effect:** `errorHandling$`

**Description:** Handles errors and displays notifications using PrimeNG for user feedback. It listens for todoError actions and shows appropriate error messages.

```typescript
errorHandling$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TodoActions.todoError),
    mergeMap((errorMessage) => {
      this.messageService.add({
        severity: NotificationType.Error,
        summary: errorMessage.type,
        detail: errorMessage.error ?? 'Something wrong',
      });
      return of(TodoActions.todoErrorHandling());
    })
  )
);
```

## How to Run
Clone the repository.
Install dependencies using npm install.
Configure Firebase authentication settings.
Start the Angular application using ng serve.
Navigate to http://localhost:4200/ in your browser.

## Development and Refactoring
This project is under active development and refactoring to improve code quality and showcase frontend development skills with Angular and ngrx.


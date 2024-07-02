import { Priority, Stage, Tag } from './mz.enums';

export interface TodoDTO {
  todos: TodoItems[];
  totalRecords: number;
}

export interface TodoItems {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  deadline: Date;
  priority: Priority;
  stage: Stage;
  createdBy: string;
  createdAt: Date;
  owned: EmailAddress;
  tags: Tags[];
  assignedTo: TodoAssignedToEmailAddressDTO[];
  comments: Comments[];
}

export interface Tags {
  id: number;
  todoId: number;
  name: Tag;
}

export interface Comments {
  id: number;
  todoId: number;
  text: string;
  createdBy: string;
  createdAt: Date;
}

export interface TodoAssignedToEmailAddressDTO {
  id: number;
  todoId: number;
  email: string;
  displayName: string;
}

export interface TodoBasicItems {
  title: string;
  description: string;
  priority: Priority;
}

export interface TodoAdditionalItems {
  deadline: Date;
  stage: Stage;
  tags: Tags[];
}

export interface TodoCommentItems {
  comments: Comments[];
}

export interface EmailAddress {
  id: number;
  email: string;
  displayName: string;
}

export interface EmailAddressDTO {
  id: number;
  email: string;
  username: string;
}

/// <reference types="react-scripts" />

export type Todo = {
  todo: string;
  completed: boolean;
  dateAdded: number;
  dateCompleted: number;
};

export type Todos = {
  [id: string]: Todo;
};

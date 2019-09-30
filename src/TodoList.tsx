import React from "react";
import { Todos } from "./types";
import TodoListItem from "./TodoListItem";

type TodoListProps = {
  todos: Todos;
};

export default function TodoList({ todos }: TodoListProps) {
  return (
    <div className="TodoList">
      {Object.keys(todos).map(todoId => (
        <TodoListItem key={todoId} id={todoId} todo={todos[todoId]} />
      ))}
    </div>
  );
}

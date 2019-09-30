import React from "react";
import { Todo } from "./types";

type TodoListItemProps = {
  id: string;
  todo: Todo;
};

function CompleteIcon() {
  return <span className="CompleteIcon">&#9745;</span>;
}

function IncompleteIcon() {
  return <span className="IncompleteIcon">&#9744;</span>;
}

export default function TodoListItem({ id, todo }: TodoListItemProps) {
  return (
    <div className="TodoListItem">
      <button className="ToggleButton" type="button">
        {todo.completed ? <CompleteIcon /> : <IncompleteIcon />}
      </button>
      {todo.todo}
    </div>
  );
}

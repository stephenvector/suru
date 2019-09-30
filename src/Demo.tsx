import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import { Todos } from "./types";

const TODO_ITEMS = [
  "Create a todo item",
  "Check it off",
  "Make another todo item",
  "Spread the word"
];

export default function Demo() {
  const [currentValue, setCurrentValue] = useState("");
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [currentTodoItem, setCurrentTodoItem] = useState(0);
  const [currentTodoItemIndex, setCurrentTodoItemIndex] = useState(0);
  const [currentTodos, setCurrentTodos] = useState<Todos>({});

  useEffect(() => {
    function loop() {
      if (currentTodoItemIndex <= TODO_ITEMS[currentTodoItem].length) {
        if (new Date().getTime() >= startTime) {
          setCurrentValue(
            `${TODO_ITEMS[currentTodoItem].slice(0, currentTodoItemIndex)}|`
          );
          setCurrentTodoItemIndex(currentTodoItemIndex + 1);
        }
      } else {
        setStartTime(new Date().getTime() + 1200);
        setCurrentValue("");
        setCurrentTodoItem((currentTodoItem + 1) % TODO_ITEMS.length);

        const newTodos = Object.keys(currentTodos)
          .sort(idA => {
            return -1 * currentTodos[idA].dateAdded;
          })
          .splice(0, TODO_ITEMS.length)
          .reduce(
            (acc, id) => {
              acc[id] = currentTodos[id];
              return acc;
            },
            {} as Todos
          );

        const t = `random${Math.floor(
          Math.random() * 10000
        )}${new Date().getTime()}`;

        setCurrentTodos({
          [t]: {
            todo: TODO_ITEMS[currentTodoItem],
            dateAdded: new Date().getTime(),
            dateCompleted: 0,
            completed: false
          },
          ...newTodos
        });
        setCurrentTodoItemIndex(0);
      }
    }

    const timer = setInterval(loop, 90);

    return () => {
      clearInterval(timer);
    };
  }, [startTime, currentTodoItem, currentTodoItemIndex, currentTodos]);

  return (
    <div className="Demo">
      <input type="text" value={currentValue} readOnly />
      <div className="DemoTodoListWrapper">
        <TodoList todos={currentTodos} />
        <div className="DemoTodoListGradientOverlay" />
      </div>
    </div>
  );
}

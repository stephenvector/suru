import React, { useState } from "react";
import { FormApi } from "final-form";
import { Form, Field } from "react-final-form";

type NewTodoValues = {
  todo: string;
};

export default function NewTodo() {
  const [newTodo, setNewTodoValue] = useState("");

  function onSubmit(values: NewTodoValues, form: FormApi<NewTodoValues>) {
    setTimeout(() => {
      form.reset();
    }, 0)
  }

  return (
    <div>
      <Form<{ todo: string }> onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="todo"
              type="text"
              component="input"
              placeholder="Next thing to do is..."
              autoComplete="off"
            />
          </form>
        )}
      </Form>
    </div>
  );
}

import React, { useState } from 'react';
import { MOCK_TODOS } from './MockTodos';
import { Todo } from './Todo';
import TodoList from './TodoList';
import { getTodos } from './todoAPI';

function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>(MOCK_TODOS);
  const saveTodo = (todo: Todo) => {
    let updateTodos = todos.map((t: Todo) => {
      return t.id === todo.id ? todo : t;
    });
    setTodos(updateTodos);
  }
  return (
    <>
      <h1>Todos</h1>
      <TodoList onSave={saveTodo} todos={todos} />
    </>
  )
}

export default TodosPage
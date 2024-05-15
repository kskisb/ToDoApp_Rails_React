import React, { useState } from 'react';
import { MOCK_TODOS } from './MockTodos';
import { Todo } from './Todo';
import TodoList from './TodoList';
import { getTodos } from './todoAPI';

function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  return (
    <>
      <h1>Todos</h1>
      {/* <TodoList onSave={saveTodo} todos={MOCK_TODOS} /> */}
      <TodoList todos={MOCK_TODOS} />
    </>
  )
}

export default TodosPage
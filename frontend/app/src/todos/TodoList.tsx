import React, { useState } from 'react';
import { Todo } from './Todo';
import TodoCard from './TodoCard';


interface TodoListProps {
  todos: Todo[];
}

function TodoList({ todos }: TodoListProps) {
  return (
    <div className="row">
      {todos.map((todo) => (
        <div key={todo.id} className="cols-sm">
          <TodoCard todo={todo} />
        </div>
      ))}
    </div>
  );
}

export default TodoList;
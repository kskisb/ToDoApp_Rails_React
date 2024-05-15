import React, { useState } from 'react';
import { Todo } from './Todo';
import TodoCard from './TodoCard';
import TodoForm from './TodoForm';


interface TodoListProps {
  todos: Todo[];
  // onSave: (todo: Todo) => void;
}

// function TodoList({ todos, onSave }: TodoListProps) {
function TodoList({ todos }: TodoListProps) {
  const [todoBeingEdited, setTodoBeingEdited] = useState({});
  const handleEdit = (todo: Todo) => {
    setTodoBeingEdited(todo);
  };
  const cancelEditing = () => {
    setTodoBeingEdited({});
  };

  return (
    <div className="row">
      {todos.map((todo) => (
        <div key={todo.id} className="cols-sm">
          {todo === todoBeingEdited ? (
            // <TodoForm todo={todo} onSave={onSave} onCancel={cancelEditing} />
            <TodoForm todo={todo} onCancel={cancelEditing} />
          ) : (
            <TodoCard todo={todo} onEdit={handleEdit} />
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoList;
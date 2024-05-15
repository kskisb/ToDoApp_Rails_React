import React from 'react';
import { Todo } from './Todo';

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

function TodoCard(props: TodoCardProps) {
  const { todo, onEdit } = props;
  const handleEditClick = (todoBeginEdited: Todo) => {
    onEdit(todoBeginEdited);
  };

  return (
    <div className="card">
      <section className="section dark">
        <h5 className="strong">
          <strong>{todo.title}</strong>
        </h5>
        <button className="bordered" onClick={() => { handleEditClick(todo) }}>
          <span className="icon-edit"></span>
          Edit
        </button>
      </section>
    </div>
  )
}

export default TodoCard
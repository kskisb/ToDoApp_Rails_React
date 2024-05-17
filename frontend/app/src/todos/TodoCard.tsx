import React from 'react';
import { Todo } from './Todo';
import { Link } from 'react-router-dom';

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
        <Link to={'/todos/' + todo.id}>
          <h5 className="strong">
            <strong>{todo.title}</strong>
          </h5>
        </Link>
        <button className="bordered" onClick={() => { handleEditClick(todo) }}>
          <span className="icon-edit"></span>
          Edit
        </button>
      </section>
    </div>
  )
}

export default TodoCard
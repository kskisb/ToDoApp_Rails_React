import React from 'react';
import { Todo } from '../../models/Todo';
import { Link } from 'react-router-dom';

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todoId: number) => void;
}

function TodoCard(props: TodoCardProps) {
  const { todo, onEdit, onDelete } = props;
  const handleEditClick = (todoBeginEdited: Todo) => {
    onEdit(todoBeginEdited);
  };
  const handleDeleteClick = () => {
    if (todo.id !== undefined) {
      onDelete(todo.id);
    } else {
      console.error('Todo id is undefined');
    }
  }

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
        <button className="bordered" onClick={handleDeleteClick}>
          Delete
        </button>
      </section>
    </div>
  )
}

export default TodoCard
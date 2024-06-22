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

  const handleEditClick = (todoBeingEdited: Todo) => {
    onEdit(todoBeingEdited);
  };

  const handleDeleteClick = () => {
    if (todo.id !== undefined) {
      onDelete(todo.id);
    } else {
      console.error('Todo id is undefined');
    }
  };

  const statusClass = todo.completed ? 'completed' : 'in-progress';

  return (
    <div className="container">
      <section className="section horizontal">
        <Link to={'/todos/' + todo.id}>
          <h5 className="strong">
            <strong>{todo.title}</strong>
          </h5>
        </Link>
        <button className="bordered" onClick={() => handleEditClick(todo)}>
          <span className="icon-edit"></span>
          Edit
        </button>
        <button className="bordered" onClick={handleDeleteClick}>
          Delete
        </button>
        <p>
          <mark className={`status ${statusClass}`}>
            {todo.completed ? 'Done' : 'In progress'}
          </mark>
        </p>
      </section>
    </div>
  );
}

export default TodoCard;
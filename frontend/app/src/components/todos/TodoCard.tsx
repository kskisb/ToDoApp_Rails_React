import React from 'react';
import { Todo } from '../../models/Todo';
import { Link } from 'react-router-dom';
import '../../TodoCard.css';

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  const statusClass = todo.completed ? 'completed' : 'in-progress';

  return (
    <div className="container">
      <section className="section">
        <Link to={'/todos/' + todo.id}>
          <h5 className="strong">
            <strong>{todo.title}</strong>
          </h5>
        </Link>
        <p>
          <strong>Deadline: </strong>
          {todo.deadline ? formatDate(todo.deadline) : 'Not set'}
        </p>
        <p>
          <strong>Priority: </strong>
          <mark className={`priority ${todo.priority}`}>
            {todo.priority}
          </mark>
        </p>
        <p>
          <strong>Status: </strong>
          <mark className={`status ${statusClass}`}>
            {todo.completed ? 'Done' : 'In progress'}
          </mark>
        </p>
        <div className="actions">
          <button className="bordered edit" onClick={() => handleEditClick(todo)}>
            <span className="icon-edit"></span>
            Edit
          </button>
          <button className="bordered delete" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}

export default TodoCard;
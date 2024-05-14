import React from 'react';
import { Todo } from './Todo';

interface TodoCardProps {
  todo: Todo;
}

function TodoCard(props: TodoCardProps) {
  const { todo } = props;

  return (
    <div className="card">
      <section className="section dark">
        <h5 className="strong">
          <strong>{todo.title}</strong>
        </h5>
        <button className="bordered">
          <span className="icon-edit"></span>
          Edit
        </button>
      </section>
    </div>
  )
}

export default TodoCard
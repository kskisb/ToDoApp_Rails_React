import React, { useState } from 'react';
import { Todo } from './Todo';
import TodoForm from './TodoForm';

interface TodoCreateProps {
  onSave: (todo: Todo) => void;
}

function TodoCreate({ onSave }: TodoCreateProps) {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
  };

  const handleSave = (todo: Todo) => {
    onSave(todo);
    setIsCreating(false);
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        {isCreating ? (
          <TodoForm
            todo={new Todo()}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <div className="button-group fluid">
            <button className="button primary" onClick={handleCreate}>
              New Todo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoCreate
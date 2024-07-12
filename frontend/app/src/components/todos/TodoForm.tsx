import React, { SyntheticEvent, useState } from 'react';
import { Todo } from 'models/Todo';

interface TodoFormProps {
  todo: Todo;
  onSave: (todo: Todo) => void;
  onCancel: () => void;
}

function TodoForm({ todo: initialTodo, onSave, onCancel }: TodoFormProps) {
  const [todo, setTodo] = useState(initialTodo);
  const [errors, setErrors] = useState({
    title: '',
  });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if(!isValid()) return;
    onSave(todo);
  }

  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    let updateValue = type === 'checkbox' ? checked : value;

    if(type === 'number') {
      updateValue = Number(updateValue);
    }

    const change = {
      [name]: updateValue,
    }

    let updateTodo: Todo;
    setTodo((t) => {
      updateTodo = new Todo({ ...t, ...change });
      return updateTodo;
    });
    setErrors(() => validate(updateTodo));
  }

  function validate(todo: Todo) {
    let errors: any = { title: '' };
    if(todo.title.length === 0) {
      errors.title = 'Title is required.';
    }
    return errors;
  }

  function isValid() {
    return errors.title.length === 0;
  }

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor='title'>Todo Title</label>
      <input type="text" name="title" placeholder="enter title" value={todo.title} onChange={handleChange} />
      {errors.title.length > 0 && (
        <div className="card error">
          <p>{errors.title}</p>
        </div>
      )}
      <label htmlFor='completed'>Done?</label>
      <input type="checkbox" name="completed" checked={todo.completed} onChange={handleChange} />
      <label htmlFor='priority'>Priority</label>
      <select name="priority" value={todo.priority} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <label htmlFor='deadline'>Deadline</label>
      <input type="datetime-local" name="deadline" value={todo.deadline} onChange={handleChange} />
      <div className="actions">
        <button className="bordered save">Save</button>
        <span />
        <button type="button" className="bordered" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  )
}

export default TodoForm

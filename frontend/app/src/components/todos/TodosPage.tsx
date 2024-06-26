import React, { useState, useEffect } from 'react';
import { todoAPI } from '../../api/todoAPI';
import { Todo } from '../../models/Todo';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';

function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleDeleteTodo = async (todoId: number) => {
    try {
      setLoading(true);
      const todoToDelete = await todoAPI.find(todoId);

      await todoAPI.delete(todoToDelete);

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoToDelete.id));
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadTodos() {
      setLoading(true);
      try {
        const data = await todoAPI.get(1);
        setError('');
        setTodos(data);
      }
      catch (e) {
        if(e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadTodos();
  }, [1]);

  const createTodo = (todo: Todo) => {
    todoAPI
      .post(todo)
      .then((createdTodo) => {
        setTodos((todos) => [...todos, new Todo(createdTodo)]);
      })
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message);
        }
      });
  };

  const saveTodo = (todo: Todo) => {
    todoAPI
      .put(todo)
      .then((updatedTodo) => {
        let updatedTodos: Todo[] = todos.map((t: Todo) => {
          return t.id === todo.id ? new Todo(updatedTodo) : t;
        });
        setTodos(updatedTodos);
      })
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message);
        }
      });
  };

  return (
    <>
      <h1>Todos</h1>

      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse"></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

      <TodoCreate onSave={createTodo} />

      <TodoList onSave={saveTodo} todos={todos} onDelete={handleDeleteTodo} />

      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default TodosPage
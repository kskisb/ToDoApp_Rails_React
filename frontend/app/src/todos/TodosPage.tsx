import React, { useState, useEffect } from 'react';
import { todoAPI } from './todoAPI';
import { Todo } from './Todo';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';

function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  useEffect(() => {
    async function loadTodos() {
      setLoading(true);
      try {
        const data = await todoAPI.get(currentPage);
        setError('');
        if(currentPage === 1) {
          setTodos(data);
        } else {
          setTodos((todos) => [...todos, ...data]);
        }
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
  }, [currentPage]);

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

      <TodoList onSave={saveTodo} todos={todos} />

      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}

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
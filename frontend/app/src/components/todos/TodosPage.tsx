import React, { useState, useEffect, useContext } from 'react';
import { todoAPI } from 'api/todoAPI';
import { Todo } from 'models/Todo';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';
import { AuthContext } from 'App';

function TodosPage() {
  const { currentUser } = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleDeleteTodo = async (todoId: number) => {
    try {
      if (!currentUser) throw new Error('User not authenticated');

      setLoading(true);
      const todoToDelete = await todoAPI.find(currentUser.id, todoId);

      await todoAPI.delete(currentUser.id, todoToDelete);

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoToDelete.id));
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function loadTodos() {
      setLoading(true);
      try {
        if (!currentUser) throw new Error('User not authenticated');

        const data = await todoAPI.get(currentUser.id);
        setError('');
        setTodos(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    if (currentUser) {
      loadTodos();
    }
  }, [currentUser]);

  const createTodo = (todo: Todo) => {
    if (!currentUser) {
      setError('User not authenticated');
      return;
    }

    todoAPI
      .post(currentUser.id, todo)
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
    if (!currentUser) {
      setError('User not authenticated');
      return;
    }

    todoAPI
      .put(currentUser.id, todo)
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

export default TodosPage;

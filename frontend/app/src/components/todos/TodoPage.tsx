import React, { useEffect, useState, useContext } from 'react';
import { todoAPI } from 'api/todoAPI';
import TodoDetail from './TodoDetail';
import { Todo } from 'models/Todo';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'App';

function TodoPage(props: any) {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    async function loadTodo() {
      setLoading(true);
      try {
        if (!currentUser) throw new Error('User not authenticated');

        const data = await todoAPI.find(currentUser.id, id);
        setTodo(data);
        setError(null);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }

    if (currentUser) {
      loadTodo();
    }
  }, [currentUser, id]);

  return (
    <div>
      <>
        <h1>Todo Detail</h1>

        {loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse"></span> {error}
                </p>
              </section>
            </div>
          </div>
        )}

        {todo && <TodoDetail todo={todo} />}
      </>
    </div>
  );
}

export default TodoPage;

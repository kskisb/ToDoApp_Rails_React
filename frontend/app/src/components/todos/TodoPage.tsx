import React, { useEffect, useState } from 'react';
import { todoAPI } from 'api/todoAPI';
import TodoDetail from './TodoDetail';
import { Todo } from 'models/Todo';
import { useParams } from 'react-router-dom';

function TodoPage(props: any) {
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    setLoading(true);
    todoAPI
      .find(id)
      .then((data) => {
        setTodo(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [id]);

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

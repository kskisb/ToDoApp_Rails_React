import React from 'react'
import { Todo } from './Todo'

interface TodoDetailProps {
  todo: Todo;
}

export default function TodoDetail({ todo }: TodoDetailProps) {
  return (
    <div className="row">
      <div className="com-sm-6">
        <div className="card large">
          <section className="section dark">
            <h3 className="strong">
              <strong>{todo.title}</strong>
            </h3>
            <p>
              <mark className="active">
                {' '}
                {todo.completed ? 'Done' : 'In progress'}
              </mark>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
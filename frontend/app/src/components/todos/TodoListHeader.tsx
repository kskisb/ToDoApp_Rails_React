import React from 'react';
import '../../TodoListHeader.css';

function TodoListHeader() {
  return (
    <div className="container list-header">
      <div className="section">
        <div className="col-sm"><strong>Title</strong></div>
        <div className="col-sm"><strong>Deadline</strong></div>
        <div className="col-sm"><strong>Priority</strong></div>
        <div className="col-sm"><strong>Status</strong></div>
        <div className="col-sm"><strong>Actions</strong></div>
      </div>
    </div>
  );
}

export default TodoListHeader;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import TodosPage from './components/todos/TodosPage';
import TodoPage from './components/todos/TodoPage';
import './App.css';
import UsersPage from './components/users/UsersPage';

function App() {
  return (
    <Router>
      <header className="sticky">
        <span className="">
          {/* <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" /> */}
        </span>
        <NavLink to="/" className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/todos" className="button rounded">
          Todos
        </NavLink>
        <NavLink to="/users" className="button rounded">
          Users
        </NavLink>
      </header>
      <div className="container">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/todos' element={<TodosPage />} />
          <Route path='/todos/:id' element={<TodoPage />} />
          <Route path='/users' element={<UsersPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;

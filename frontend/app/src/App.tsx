import React, { useEffect, useState } from 'react';
import { TodoType } from './types/todo';
import { createTodo, deleteTodo, getTodos, updateTodo } from './lib/api/todos';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Checkbox, Flex, Heading, Input, VStack } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './home/HomePage';
import TodosPage from './todos/TodosPage';

const App = () => {
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
      </header>
      <div className="container">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/todos' element={<TodosPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;

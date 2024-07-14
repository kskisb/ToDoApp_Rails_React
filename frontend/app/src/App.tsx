import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import CommonLayout from 'components/layouts/CommonLayout';
import HomePage from './components/home/HomePage';
import SignUpPage from 'components/auth/SignUpPage';
import SignInPage from 'components/auth/SignInPage';
import TodosPage from './components/todos/TodosPage';
import TodoPage from './components/todos/TodoPage';
import UsersPage from './components/users/UsersPage';
import './App.css';

import { getCurrentUser } from 'api/auth';
import { User } from 'interfaces/user/index'

export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  // Check for an authenticated user
  // If confirmed, retrieve the user's info
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if(res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        console.log(res?.data.data)
      } else {
        console.log('No authenticated user')
      }
    } catch(err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  // Determine Routing whether the user is authenticated or not
  // Prompt the user to the '/signin' if unauthenticated
  const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
    if(!loading) {
      return isSignedIn ? children : <Navigate to='/signin' replace />
    }
    return null
  }

  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
        <CommonLayout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/todos' element={
              <PrivateRoute>
                <TodosPage />
              </PrivateRoute>
            } />
            <Route path='/todos/:id' element={
              <PrivateRoute>
                <TodoPage />
              </PrivateRoute>
            } />
            <Route path='/users' element={
              <PrivateRoute>
                <UsersPage />
              </PrivateRoute>
            } />
          </Routes>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  )
}

export default App;

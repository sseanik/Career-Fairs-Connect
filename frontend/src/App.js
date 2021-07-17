import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { EmployerRegister } from './features/register/EmployerRegister';
import { StudentRegister } from './features/register/StudentRegister';
import { UniversityRegister } from './features/register/UniversityRegister';

function App() {
  return (
    <ChakraProvider>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/register' component={Register} exact />
        <Route path='/register/employer' component={EmployerRegister} exact />
        <Route path='/register/student' component={StudentRegister} exact />
        <Route
          path='/register/university'
          component={UniversityRegister}
          exact
        />
      </Switch>
    </ChakraProvider>
  );
}

export default App;

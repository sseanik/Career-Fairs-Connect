import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { CompanyRegister } from './features/register/CompanyRegister';

function App() {
  return (
    <ChakraProvider>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/register' component={Register} exact />
        <Route path='/register/student' />
        <Route path='/register/university' />
        <Route path='/register/employer' />
      </Switch>
    </ChakraProvider>
  );
}

export default App;

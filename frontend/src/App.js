import React from 'react';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import { Route, Switch } from "react-router-dom"
import Home from './pages/home';
import Login from './pages/login'
import Register from './pages/register'

function App() {
  return (
    <ChakraProvider>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact/>
        <Route path="/register/student" />
        <Route path="/register/university" />
        <Route path="/register/employer" />
      </Switch>
    </ChakraProvider>
  );
}

export default App;

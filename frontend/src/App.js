import React from 'react';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import { Route, Switch } from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <ChakraProvider>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact/>
      </Switch>
    </ChakraProvider>
  );
}

export default App;

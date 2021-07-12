import React from 'react';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import { Route, Switch } from "react-router-dom"
import Home from './pages/home';

function App() {
  return (
    <ChakraProvider>
      <Switch>
        <Route path="/" component={Home} exact/>
      </Switch>
    </ChakraProvider>
  );
}

export default App;

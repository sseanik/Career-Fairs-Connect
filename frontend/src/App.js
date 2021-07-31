import React from 'react';
import './App.css';
import { Button, ButtonGroup, ChakraProvider } from '@chakra-ui/react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { StudentRegister } from './features/auth/StudentRegister';
import { UniversityRegister } from './features/auth/UniversityRegister';
import CareerFair from './features/careerFair/CareerFair';
import CompanyStall from './features/careerFair/CompanyStall';
import CareerEvents from './features/careerFair/CareerEvents';
import { useDispatch } from 'react-redux';
import { asyncFetchUserData } from './features/auth/userSlice';
import EmployerRegister from './features/auth/EmployerRegister';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => dispatch(asyncFetchUserData()), [dispatch]);

  return (
    <ChakraProvider>
      <ButtonGroup>
        <Button
          onClick={() => {
            localStorage.setItem('test', 'Student');
            window.location.reload(false);
          }}
        >
          Student
        </Button>
        <Button
          onClick={() => {
            localStorage.setItem('test', 'Company');
            window.location.reload(false);
          }}
        >
          Company
        </Button>
        <Button
          onClick={() => {
            localStorage.setItem('test', 'Unlisted');
            window.location.reload(false);
          }}
        >
          Unlisted Company
        </Button>
        <Button
          onClick={() => {
            localStorage.setItem('test', 'University');
            window.location.reload(false);
          }}
        >
          University
        </Button>
        <Button as={Link} to='/events'>
          Events
        </Button>
      </ButtonGroup>
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
        <Route path='/events/' component={CareerEvents} exact />
        <Route path='/fair/:fairID' component={CareerFair} exact />
        <Route path='/stall/:stallID' component={CompanyStall} exact />
      </Switch>
    </ChakraProvider>
  );
}

export default App;

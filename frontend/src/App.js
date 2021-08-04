import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
// Redux
import { useDispatch } from 'react-redux';
import { asyncFetchUserData } from './features/auth/userSlice';
// Chakra UI
import { Button, ButtonGroup, ChakraProvider } from '@chakra-ui/react';
// Non-Logged In Pages
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import { StudentRegister } from './features/auth/StudentRegister';
import { UniversityRegister } from './features/auth/UniversityRegister';
import EmployerRegister from './features/auth/EmployerRegister';
import LandingPage from './features/landing/LandingPage';
// Logged In Pages
import CareerFair from './features/careerFair/CareerFair';
import CompanyStall from './features/companyStall/CompanyStall';
import CareerEvents from './features/careerEvents/CareerEvents';
import CompanyProfile from './features/profile/companyProfile';
import theme from './app/theme';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => dispatch(asyncFetchUserData()), [dispatch]);

  return (
    <ChakraProvider theme={theme}>
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
        <Route path='/' component={LandingPage} exact />
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
        <Route path='/company/:userID' component={CompanyProfile} exact />
      </Switch>
    </ChakraProvider>
  );
}

export default App;

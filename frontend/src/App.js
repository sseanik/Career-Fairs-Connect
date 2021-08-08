import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchUserData } from './features/auth/userSlice';
// Chakra UI
import { ChakraProvider } from '@chakra-ui/react';
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
//Profile Pages
import CompanyProfile from './features/profile/companyProfile';
import CompanyEdit from './features/profile/companyEdit';

import theme from './app/theme';
import Navbar from './components/Navbar';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedIn = useSelector((state) => state.user.loggedIn);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(asyncFetchUserData(localStorage.getItem('token')));
    }
  }, [dispatch, history, loggedIn]);

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Switch>
        {loggedIn ? (
          <Route path='/' component={CareerEvents} exact />
        ) : (
          <Route path='/' component={LandingPage} exact />
        )}

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
        <Route path='/fair/:fairID/:tab?' component={CareerFair} exact />
        <Route path='/stall/:stallID/:tab?' component={CompanyStall} exact />
        {/* profile */}
        <Route path='/company/' component={CompanyProfile} exact />
        <Route path='/company/edit' component={CompanyEdit} exact />
      </Switch>
    </ChakraProvider>
  );
}

export default App;

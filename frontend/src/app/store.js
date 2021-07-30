import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import logoReducer from '../features/register/logoSlice';
import eventsReducer from '../features/careerFair/eventsSlice';
import fairReducer from '../features/careerFair/fairSlice';
import stallReducer from '../features/careerFair/stallSlice';
import windowReducer, {
  setWindowHeight,
  setWindowWidth,
} from '../components/windowSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    window: windowReducer,
    logo: logoReducer,
    events: eventsReducer,
    fair: fairReducer,
    stall: stallReducer,
  },
});

window.addEventListener('resize', () => {
  store.dispatch(setWindowWidth(window.innerWidth));
  store.dispatch(setWindowHeight(window.innerHeight));
});

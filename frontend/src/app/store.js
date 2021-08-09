import { configureStore } from '@reduxjs/toolkit';
import logoReducer from '../features/auth/logoSlice';
import userReducer from '../features/auth/userSlice';
import eventsReducer from '../features/careerEvents/eventsSlice';
import fairReducer from '../features/careerFair/fairSlice';
import stallReducer from '../features/companyStall/stallSlice';
import windowReducer, {
  setWindowHeight,
  setWindowWidth,
} from '../util/windowSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
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

import { combineReducers } from '@reduxjs/toolkit';
import { userLoggedReducer } from './modules/userLogged';
import { tasksReducer } from './modules/tasks';
import { alertReducer } from './modules/alert';

export const rootReducer = combineReducers({
  userLogged: userLoggedReducer,
  tasks: tasksReducer,
  alert: alertReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

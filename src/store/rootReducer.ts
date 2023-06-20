import { combineReducers } from '@reduxjs/toolkit';
import { userLoggedReducer } from './modules/userLogged';
import { tasksReducer } from './modules/tasks';

export const rootReducer = combineReducers({
  userLogged: userLoggedReducer,
  tasks: tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { apirecados } from '../../service/api';
import { RootState } from '../rootReducer';

export type TTask = {
    idTask: string,
    title: string,
    description: string,
    date: Date,
    favorite: boolean,
    finished: boolean
}

export type TCreateTask = Omit<TTask, 'idTask' | 'favorite' | 'finished'>;

type TRequestCreate = {
    idUser: string,
    task: TCreateTask,
    authorization: string
}

type TRequestGet = {
  idUser: string,
  authorization: string
}

type TUpdateTask = {
    idUser: string,
    task: TTask,
    authorization: string
}

type TDeleteTask = {
    idUser: string,
    idTask: string,
    authorization: string
}

const adapter = createEntityAdapter<TTask>({
  selectId: (item) => item.idTask,
});

export const createTask = createAsyncThunk('tasks/create', async ({ idUser, task, authorization }: TRequestCreate) => {
  const response = await apirecados.post('/tasks', { ...task, userId: idUser }, { headers: { AuthToken: authorization } });
  return response;
});

export const getTasks = createAsyncThunk('tasks/get', async ({ idUser, authorization }: TRequestGet) => {
  const response = await apirecados.get(`/tasks/${idUser}`, { headers: { AuthToken: authorization } });
  return response;
});

export const updateTask = createAsyncThunk('tasks/update', async ({ idUser, task, authorization }:TUpdateTask) => {
  await apirecados.put(`/tasks/${idUser}/${task.idTask}`, task, { headers: { AuthToken: authorization } });
  return task;
});

export const deleteTask = createAsyncThunk('tasks/delete', async ({ idUser, idTask, authorization }:TDeleteTask) => {
  await apirecados.delete(`/tasks/${idUser}/${idTask}`, { headers: { AuthToken: authorization } });
  return idTask;
});

const slice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createTask.fulfilled, (state, action) => {
      adapter.addOne(state, action.payload.data);
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      console.log(action.payload.data);
      adapter.setAll(state, action.payload.data);
    });
    builder.addCase(updateTask.fulfilled, (state, { payload }) => {
      adapter.updateOne(state, { id: payload.idTask, changes: payload });
    });
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      adapter.removeOne(state, payload);
    });
  },
});

export const tasksReducer = slice.reducer;
export const taskAdapter = adapter.getSelectors<RootState>((state) => state.tasks);

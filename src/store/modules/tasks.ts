import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { apirecados } from '../../service/api';
import { RootState } from '../rootReducer';

type TTask = {
    id: string,
    title: string,
    description: string,
    date: Date,
    favorite: boolean,
    finished: boolean
}

type TRequestCreate = {
    task: Omit<TTask, 'id' | 'favorite' | 'finished'>,
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
  selectId: (item) => item.id,
});

export const createTask = createAsyncThunk('tasks/create', async ({ task, authorization }: TRequestCreate) => {
  const response = await apirecados.post('/tasks', task, { headers: { Authorization: `Bearer ${authorization}` } });
  return response;
});

export const getTasks = createAsyncThunk('tasks/get', async ({ idUser, authorization }: TRequestGet) => {
  const response = await apirecados.get(`/tasks/${idUser}`, { headers: { Authorization: `Bearer ${authorization}` } });
  return response;
});

export const updateTask = createAsyncThunk('tasks/update', async ({ idUser, task, authorization }:TUpdateTask) => {
  await apirecados.put(`/tasks/${idUser}/${task.id}`, task, { headers: { Authorization: `Bearer ${authorization}` } });
  return task;
});

export const deleteTask = createAsyncThunk('tasks/delete', async ({ idUser, idTask, authorization }:TDeleteTask) => {
  await apirecados.delete(`/tasks/${idUser}/${idTask}`, { headers: { Authorization: `Bearer ${authorization}` } });
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
      adapter.setAll(state, action.payload.data.tasks);
    });
    builder.addCase(updateTask.fulfilled, (state, { payload }) => {
      adapter.updateOne(state, { id: payload.id, changes: payload });
    });
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      adapter.removeOne(state, payload);
    });
  },
});

export const tasksReducer = slice.reducer;
export const taskAdapter = adapter.getSelectors<RootState>((state) => state.tasks);

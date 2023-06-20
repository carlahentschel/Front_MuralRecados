/* eslint-disable no-tabs */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apirecados } from '../../service/api';

type TUser = {
  id: string;
	name: string;
	token: string;
};

type TCreateUser = {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string
}

type TUserLogin = {
    email: string;
    password: string;
}

export const createUser = createAsyncThunk('userLogged/createUser', async ({
  name, email, password, passwordConfirm,
}: TCreateUser) => {
  const response = await apirecados.post('/users', {
    name, email, password, password_confirm: passwordConfirm,
  });
  return response;
});

export const userLogin = createAsyncThunk('userLogged/login', async (data: TUserLogin) => {
  const response = await apirecados.post('/auth', data);
  return response;
});

export const slice = createSlice({
  name: 'userLogged',
  initialState: {} as TUser,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createUser.fulfilled, (state, action) => {
      // feedback pro usuário
      window.location.href = '/';
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log(action);

      state.name = action.payload.data.name;
      state.id = action.payload.data.id;
      state.token = action.payload.data.token;
    });
  },
});

// export const {} = slice.actions;

export const userLoggedReducer = slice.reducer;

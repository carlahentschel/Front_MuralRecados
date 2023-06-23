import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apirecados } from '../../service/api';
import { setAlert } from './alert';

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

export const userLogin = createAsyncThunk('userLogged/login', async (data: TUserLogin, { dispatch }) => {
  try {
    const response = await apirecados.post('/auth', data);
    return response;
  } catch (error) {
    dispatch(setAlert({
      msg: 'Esta conta não existe.',
      type: 'error',
    }));
    throw error;
  }
});

export const slice = createSlice({
  name: 'userLogged',
  initialState: {} as TUser,
  reducers: {
    logout: () => ({ id: '', name: '', token: '' }),
  },
  extraReducers(builder) {
    builder.addCase(createUser.fulfilled, () => {
      window.location.href = '/';
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.name = action.payload.data.name;
      state.id = action.payload.data.id;
      state.token = action.payload.data.token;
    });
  },
});

export const { logout } = slice.actions;

export const userLoggedReducer = slice.reducer;

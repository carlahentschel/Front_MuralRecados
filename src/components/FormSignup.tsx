import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { createUser } from '../store/modules/userLogged';
import { setAlert } from '../store/modules/alert';

const schemaCreateAccount = z.object({
  email: z.string().email(),
  name: z.string().nonempty().min(3, 'O nome deve ter no mínimo 3 letras.'),
  password: z.string().min(6, 'Senha menor que 6 dígitos.'),
  passwordConfirm: z.string().min(6, 'Senha menor que 6 dígitos.'),
})
  .refine(
    ({ password, passwordConfirm }) => password === passwordConfirm,
    {
      message: 'Senhas não conferem',
      path: ['passwordConfirm'],
    },
  );

type TCreateAccount = z.infer<typeof schemaCreateAccount>;
export function FormSignup() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateAccount>({
    resolver: zodResolver(schemaCreateAccount),
  });

  const onSubmit: SubmitHandler<TCreateAccount> = (data) => {
    dispatch(createUser(data));
    dispatch(setAlert({
      msg: 'Usuário criado com sucesso',
      type: 'success',
    }));
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Cadastre-se
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome
            </label>
            <div className="mt-2">
              <input
                id="name"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('name')}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('email')}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Senha
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('password')}
              />

              {errors.password && (
                <span className="text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirme sua senha
              </label>
            </div>
            <div className="mt-2">
              <input
                id="passwordConfirm"
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('passwordConfirm')}
              />

              {errors.passwordConfirm && (
                <span className="text-red-500">
                  {errors.passwordConfirm.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              CRIAR CONTA
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Já possui conta?
          {' '}
          <Link
            to="/"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Faça seu login.
          </Link>
        </p>
      </div>
    </div>
  );
}

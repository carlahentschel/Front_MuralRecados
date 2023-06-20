import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { userLogin } from '../store/modules/userLogged';

const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Senha menor que 6 dígitos'),
});

type TLogin = z.infer<typeof schemaLogin>;

export function FormSignin() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userLogged);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(schemaLogin),
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (user.id) {
      return navigate('/home');
    }
  }, [user]);

  const onSubmit: SubmitHandler<TLogin> = (data) => {
    console.log(data);

    dispatch(userLogin(data));
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
          Acessar mural de recados
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                required
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
                required
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
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              ENTRAR
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Não tem uma conta?
          {' '}
          <Link
            to="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Cadastre-se!
          </Link>
        </p>
      </div>
    </div>
  );
}

'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import * as yup from 'yup';

import { Button } from '@/components/Button';
import { Input } from '@/components/inputs/Input';

import { AuthSocialButton } from './AuthSocialButton';

type Variant = 'LOGIN' | 'REGISTER';

const formLoginSchema = yup.object({
  name: yup.string(),
  email: yup
    .string()
    .email('E-mail com formato inválido.')
    .required('Digite seu e-mail, por favor.'),
  password: yup
    .string()
    .required('Digite sua senha, por favor.')
    .min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});
interface LoginFormData {
  name?: string;
  email: string;
  password: string;
}

export function AuthForm() {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const session = useSession();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(formLoginSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users');
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() => signIn('credentials', data))
        .catch(() =>
          toast.error('Ocorreu um erro. Tente novamente mais tarde!'),
        )
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Usuário ou senha inválidos.');
          }

          if (callback?.ok && !callback?.error) {
            toast.success('Logado!');
            router.push('/users');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Usuário ou senha inválidos.');
        }
        if (callback?.ok && !callback?.error) {
          toast.success('Logado!');
          router.push('/users');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="rounded-sm bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              name="name"
              label="Nome"
              error={errors.name?.message}
              disabled={isLoading}
              control={control}
            />
          )}

          <Input
            name="email"
            control={control}
            label="E-mail"
            type="email"
            error={errors.email?.message}
          />
          <Input
            name="password"
            control={control}
            label="Senha"
            type="password"
            error={errors.password?.message}
          />

          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === 'LOGIN' ? 'Login' : 'Realizar cadastro'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Ou continuar com
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center sm:flex-row justify-center gap-2 px-2 text-sm text-gray-500">
          <div>
            {variant === 'LOGIN'
              ? 'Novo no Messanger?'
              : 'Já possui uma conta?'}
          </div>
          <div onClick={toggleVariant} className="cursor-pointer underline">
            {variant === 'LOGIN' ? 'Criar uma conta' : 'Voltar para o login'}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import { Button } from '@/components/Button';
import { Input } from '@/components/inputs/Input';

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
  name: string;
  email: string;
  password: string;
}

export default function Register() {
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

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => router.push('/'))
      .catch(() => toast.error('Ocorreu um erro no seu cadastro'))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="rounded-sm bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="name"
            label="Nome"
            error={errors.name?.message}
            disabled={isLoading}
            control={control}
          />

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
              Realizar cadastro
            </Button>
          </div>
        </form>
        <div className="mt-6 flex flex-col items-center justify-center gap-2 px-2 text-sm text-gray-500 sm:flex-row">
          <div>Já possui uma conta?</div>
          <Link href="/" className="underline">
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}

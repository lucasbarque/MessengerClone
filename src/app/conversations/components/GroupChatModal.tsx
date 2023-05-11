'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { User } from '@prisma/client';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/inputs/Input';
import { Select } from '@/components/inputs/Select';

interface GroupChatModalProps {
  users: User[];
  isOpen?: boolean;
  onClose: () => void;
}

export function GroupChatModal({
  users,
  isOpen,
  onClose,
}: GroupChatModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: [],
    },
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/conversations', {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('Ocorreu algum erro.'))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Criar um grupo
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Criar um chat com mais de 2 pessoas
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                label="Nome"
                id="name"
                disabled={isLoading}
                required
                errors={errors}
              />
              <Select
                disabled={isLoading}
                label="Membros"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue('members', value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            onClick={onClose}
            type="button"
            secondary
          >
            Cancelar
          </Button>
          <Button disabled={isLoading} type="submit">
            Criar grupo
          </Button>
        </div>
      </form>
    </Modal>
  );
}

'use client';

import { InputHTMLAttributes } from 'react';

import clsx from 'clsx';
import { Controller } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLElement> {
  name: string;
  label: string;
  error?: string;
  control: any;
}

export function Input({ name, label, error, control, ...rest }: InputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input
              id={name}
              value={field.value}
              onChange={field.onChange}
              autoComplete={name}
              className={clsx(
                'form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 disabled:cursor-default disabled:opacity-50 sm:text-sm sm:leading-6',
                error && 'ring-rose-500 focus:!ring-rose-500',
              )}
              {...rest}
            />
          )}
        />
      </div>
      {error && <div className="mt-1 text-sm text-rose-500">{error}</div>}
    </div>
  );
}

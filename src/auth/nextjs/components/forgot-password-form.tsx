'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormError,
  Input,
  Button,
} from '@/components';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useActionState } from 'react';
import { forgotPassword } from '../actions';
import { forgotPasswordSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { getFormErrorMessage } from '@/lib/get-form-error-message';

const defaultValues = {
  email: '',
};

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(forgotPassword, null);
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    defaultValues,
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onTouched',
  });

  return (
    <Form {...form}>
      <div className='my-3 h-9'>
        {state?.ok === false && (
          <FormError label={getFormErrorMessage(state.errorCode)} />
        )}
      </div>
      <form action={action} className='w-full space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            type='submit'
            className='w-full'
            disabled={pending || !form.formState.isValid}
          >
            {pending ? 'Sending reset email...' : 'Send Reset Email'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input, Button } from '@/components';
import { useActionState } from 'react';
import { forgotPassword } from '../actions';
import { forgotPasswordSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';

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
      <form action={action} className='w-full space-y-8'>
        {state?.ok === false && (
          <div className='text-destructive bg-destructive/10 rounded-md p-2 text-center text-sm'>
            Something went wrong. Please try again.
          </div>
        )}
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

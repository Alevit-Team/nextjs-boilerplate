'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { signIn } from '../actions';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import { useActionState, useState } from 'react';
import { signInSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';

const defaultValues = {
  email: '',
  password: '',
};

export function SignInForm() {
  const [state, action, pending] = useActionState(signIn, null);
  const form = useForm<z.infer<typeof signInSchema>>({
    defaultValues,
    resolver: zodResolver(signInSchema),
    mode: 'onTouched',
  });

  return (
    <Form {...form}>
      <form action={action} className='min-w-[300px] space-y-2'>
        {/* {error && <p className='text-destructive'>{error}</p>}
        <div className='flex gap-4'>
          <Button
            type='button'
            onClick={async () => await oAuthSignIn('discord')}
          >
            Discord
          </Button>
          <Button
            type='button'
            onClick={async () => await oAuthSignIn('github')}
          >
            GitHub
          </Button>
        </div> */}
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
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type='submit' className='w-full' disabled={pending}>
            {pending ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { signUp } from '../actions';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';
import { signUpSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAuthErrorMessage } from '@/lib/get-auth-error-message';

const defaultValues = {
  name: '',
  email: '',
  password: '',
};

export function SignUpForm() {
  const [state, action, pending] = useActionState(signUp, null);
  const form = useForm<z.infer<typeof signUpSchema>>({
    defaultValues,
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
  });

  return (
    <Form {...form}>
      <form action={action} className='min-w-xs space-y-4'>
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
        {state?.ok === false && (
          <div className='text-destructive bg-destructive/10 rounded-md p-2 text-center text-sm'>
            {getAuthErrorMessage(state.errorCode)}
          </div>
        )}

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            {pending ? 'Signing up...' : 'Sign Up'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

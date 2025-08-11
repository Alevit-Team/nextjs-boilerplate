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
import { Input, PasswordInput, Button } from '@/components';
import { useActionState } from 'react';
import { signInSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAuthErrorMessage } from '@/lib/get-auth-error-message';
import Link from 'next/link';

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
      <form action={action} className='w-full space-y-4'>
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
          <div className='flex justify-end pt-1'>
            <Link
              href='/forgot-password'
              className='text-muted-foreground text-sm'
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <div>
          <Button
            type='submit'
            className='w-full'
            disabled={pending || !form.formState.isValid}
          >
            {pending ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

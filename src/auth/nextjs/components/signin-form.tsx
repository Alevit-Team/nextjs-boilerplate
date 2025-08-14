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
  PasswordInput,
  Button,
} from '@/components';
import { signIn } from '../actions';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useActionState } from 'react';
import { signInSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import { ErrorCode } from '../types';
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
      <div className='my-3 h-9'>
        {state?.ok === false && (
          <FormError label={getFormErrorMessage(state.errorCode)} />
        )}
      </div>
      <form action={action} className='w-full space-y-5'>
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
            <Button variant='link' asChild>
              <Link href='/forgot-password'>Forgot Password?</Link>
            </Button>
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

      {/* Show verification help if email not verified */}
      {state?.ok === false &&
        state.errorCode === ErrorCode.EMAIL_NOT_VERIFIED && (
          <div className='mt-4 rounded-lg bg-blue-50 p-4'>
            <div className='text-sm'>
              <p className='font-medium text-blue-900'>
                Need to verify your email?
              </p>
              <p className='mt-1 text-blue-700'>
                <Link
                  href='/verify-email'
                  className='text-blue-600 hover:underline'
                >
                  Click here to resend verification email
                </Link>
              </p>
            </div>
          </div>
        )}
    </Form>
  );
}

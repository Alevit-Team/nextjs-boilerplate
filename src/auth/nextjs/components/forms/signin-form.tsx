'use client';

import { Form, Input, PasswordInput, Button, Separator } from '@/components';
import { signIn } from '@/auth/nextjs/actions';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useActionState } from 'react';
import { signInSchema } from '@/auth/nextjs/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import { ErrorCode } from '@/auth/nextjs/types';
import Link from 'next/link';
import { SocialLogin } from '@/auth/nextjs/components/social-login';
import { AccountPrompt } from '../account-prompt';

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
      <Form.Container
        title='Sign in'
        description='Please enter your email and password to sign in'
      >
        <div className='my-3 h-9'>
          {state?.ok === false && (
            <Form.Status variant='error'>
              {getFormErrorMessage(state.errorCode)}
            </Form.Status>
          )}
        </div>
        <form action={action} className='w-full space-y-5'>
          <Form.Field
            control={form.control}
            name='email'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Email</Form.Label>
                <Form.Control>
                  <Input type='email' {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          <div>
            <Form.Field
              control={form.control}
              name='password'
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Password</Form.Label>
                  <Form.Control>
                    <PasswordInput {...field} />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
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
              disabled={!form.formState.isValid || pending}
              isLoading={pending}
            >
              {pending ? 'Signing in' : 'Sign in'}
            </Button>
          </div>
        </form>
        {state?.ok === false &&
          state.errorCode === ErrorCode.EMAIL_NOT_VERIFIED && (
            <div className='mt-4 rounded-lg bg-blue-50 p-4'>
              <div className='text-sm'>
                <p className='font-medium text-blue-900'>
                  Need to verify your email?
                </p>
                <AccountPrompt
                  href='/verify-email'
                  text='Need to verify your email?'
                  linkText='Click here to resend verification email'
                />
              </div>
            </div>
          )}
        <AccountPrompt
          text="Don't have an account?"
          linkText='Sign up'
          href='/sign-up'
        />
        <Separator label='Or continue with' className='my-6' />
        <SocialLogin />
      </Form.Container>
    </Form>
  );
}

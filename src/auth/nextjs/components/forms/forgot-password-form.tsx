'use client';

import { Form, Input, Button, IconBadge } from '@/components';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useActionState } from 'react';
import { forgotPassword } from '@/auth/nextjs/actions';
import { forgotPasswordSchema } from '@/auth/nextjs/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, Key, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import { AccountPrompt } from '../account-prompt';

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

  if (state?.ok === true) {
    return (
      <div className='flex flex-col items-center justify-center gap-6'>
        <IconBadge>
          <MailIcon />
        </IconBadge>
        <h1 className='text-2xl font-bold'>Check your email</h1>
        <p className='text-muted-foreground text-center text-sm'>
          We’ve sent you a reset link to{' '}
          <span className='font-medium'>{form.getValues('email')}</span>.
          <br />
          Please check your inbox and follow the instructions.
        </p>

        <div className='mt-8 flex w-full flex-col items-center'>
          <Button className='w-full' asChild>
            <Link href='/sign-in'>Back to sign in</Link>
          </Button>
          <AccountPrompt
            text='Didnt receive the email?'
            linkText='Send again'
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <Form.Container
        title='Forgot password'
        description='Please enter your email and we will send you a link to reset your password.'
      >
        <div className='my-3 h-9'>
          {state?.ok === false && (
            <Form.Status variant='error'>
              {getFormErrorMessage(state.errorCode)}
            </Form.Status>
          )}
        </div>
        <form action={action} className='space-y-6'>
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
          <div className='space-y-4'>
            <Button
              type='submit'
              className='w-full'
              disabled={!form.formState.isValid || pending}
              isLoading={pending}
            >
              {pending ? 'Sending reset email' : 'Send reset email'}
            </Button>
            <Button variant='link' asChild>
              <Link href='/sign-in'>
                <ArrowLeftIcon /> Back to sign in
              </Link>
            </Button>
          </div>
        </form>
      </Form.Container>
    </Form>
  );
}

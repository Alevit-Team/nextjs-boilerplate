'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  Button,
  IconBadge,
  PasswordInput,
  AccountPrompt,
} from '@/components';
import { resetPassword } from '../actions';
import { resetPasswordSchema } from '../schemas';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import { ArrowLeftIcon, CheckCircleIcon, Key } from 'lucide-react';
import Link from 'next/link';
import { PasswordValidation } from '../components/password-validation';

const defaultValues = {
  password: '',
};

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [state, action, pending] = useActionState(
    resetPassword.bind(null, token),
    null
  );
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    defaultValues,
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onTouched',
  });

  // If password reset was successful, show success message
  if (state?.ok === true) {
    return (
      <section className='flex min-h-full w-full flex-col items-center justify-center gap-6 py-8'>
        <IconBadge>
          <CheckCircleIcon />
        </IconBadge>
        <div className='w-full max-w-sm px-4'>
          <h1 className='text-2xl font-bold'>Password reset!</h1>
          <p>
            Your password has been successfully updated. You can now sign in
            with your new password.
          </p>
          <div className='mt-8 flex flex-col items-center'>
            <Button asChild className='w-full'>
              <Link href='/sign-in'>Continue to sign in</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='flex min-h-full w-full flex-col items-center justify-center gap-6 py-8'>
      <IconBadge>
        <Key />
      </IconBadge>
      <div className='w-full max-w-sm px-4'>
        <Form {...form}>
          <Form.Header
            title='Enter new password'
            description='Your new password must be different from your previous passwords.'
          />
          <div className='my-3 h-9'>
            {state?.ok === false && (
              <Form.Status variant='error'>
                {getFormErrorMessage(state.errorCode)}
              </Form.Status>
            )}
          </div>
          <form action={action} className='w-full space-y-6'>
            <Form.Field
              control={form.control}
              name='password'
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control>
                    <PasswordInput {...field} />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <PasswordValidation password={form.watch('password')} />
            <div className='flex flex-col items-center'>
              <Button
                type='submit'
                className='w-full'
                disabled={!form.formState.isValid || pending}
                isLoading={pending}
              >
                {pending ? 'Resetting password' : 'Reset password'}
              </Button>
              <AccountPrompt
                href='/sign-in'
                className='text-muted-foreground my-5 inline-flex items-center gap-2 text-sm hover:text-gray-900'
                text='Back to sign in'
                linkText='Back to sign in'
              />
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}

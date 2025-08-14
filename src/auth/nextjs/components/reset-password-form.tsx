'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormError,
  Button,
  Card,
  FormBadge,
  FormHeader,
} from '@/components';
import { PasswordInput } from '@/components/ui/password-input';
import { resetPassword } from '../actions';
import { resetPasswordSchema } from '../schemas';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import { ArrowLeftIcon, CheckCircleIcon, Key } from 'lucide-react';
import Link from 'next/link';
import { PasswordValidation } from './password-validation';

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
        <FormBadge>
          <CheckCircleIcon />
        </FormBadge>
        <div className='w-full max-w-sm px-4'>
          <FormHeader
            title='Password reset!'
            description='Your password has been successfully updated. You can now sign in with your new password.'
          />
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
      <FormBadge>
        <Key />
      </FormBadge>
      <div className='w-full max-w-sm px-4'>
        <FormHeader
          title='Enter new password'
          description='Your new password must be different from your previous passwords.'
        />
        <Form {...form}>
          <div className='my-3 h-9'>
            {state?.ok === false && (
              <FormError label={getFormErrorMessage(state.errorCode)} />
            )}
          </div>
          <form action={action} className='w-full space-y-6'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PasswordValidation password={form.watch('password')} />
            <div className='flex flex-col items-center'>
              <Button
                type='submit'
                className='w-full'
                disabled={pending || !form.formState.isValid}
              >
                {pending ? 'Resetting Password...' : 'Reset Password'}
              </Button>
              <Link
                href='/sign-in'
                className='text-muted-foreground my-5 inline-flex items-center gap-2 text-sm hover:text-gray-900'
              >
                <ArrowLeftIcon className='h-4 w-4' />
                Back to sign in
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}

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
} from '@/components';
import { PasswordInput } from '@/components/ui/password-input';
import { resetPassword } from '../actions';
import { resetPasswordSchema } from '../schemas';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';

const defaultValues = {
  password: '',
  confirmPassword: '',
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
      <Card className='p-6'>
        <div className='text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
            <CheckCircleIcon className='h-8 w-8 text-green-600' />
          </div>

          <h2 className='mb-2 text-2xl font-bold text-green-900'>
            Password Reset Successful!
          </h2>

          <p className='text-muted-foreground mb-6 text-sm'>
            Your password has been successfully updated. You can now sign in
            with your new password.
          </p>

          <div className='mb-6 rounded-lg bg-green-50 p-4'>
            <p className='text-sm text-green-700'>
              🔒 For security, all your existing sessions have been logged out.
            </p>
          </div>

          <Link
            href='/sign-in'
            className='inline-flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none'
          >
            Continue to Sign In
          </Link>
        </div>
      </Card>
    );
  }

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

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='pt-2'>
          <Button
            type='submit'
            className='w-full'
            disabled={pending || !form.formState.isValid}
          >
            {pending ? 'Resetting Password...' : 'Reset Password'}
          </Button>
        </div>
      </form>

      <div className='mt-6 rounded-lg bg-amber-50 p-4'>
        <div className='text-left text-sm'>
          <p className='font-medium text-amber-900'>Security Notice:</p>
          <ul className='mt-2 space-y-1 text-amber-700'>
            <li>• This link expires in 15 minutes</li>
            <li>• All existing sessions will be logged out</li>
            <li>• Choose a strong, unique password</li>
          </ul>
        </div>
      </div>
    </Form>
  );
}

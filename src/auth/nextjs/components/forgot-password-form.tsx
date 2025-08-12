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
  Button,
  Card,
} from '@/components';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useActionState } from 'react';
import { forgotPassword } from '../actions';
import { forgotPasswordSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import { CheckCircleIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';

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

  // If email was sent successfully, show success message
  if (state?.ok === true) {
    return (
      <Card className='p-6'>
        <div className='text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100'>
            <MailIcon className='h-8 w-8 text-blue-600' />
          </div>

          <h2 className='mb-2 text-2xl font-bold text-blue-900'>
            Check your email
          </h2>

          <p className='text-muted-foreground mb-6 text-sm'>
            If an account with that email exists, we've sent you a password
            reset link. Please check your inbox and follow the instructions.
          </p>

          <div className='mb-6 rounded-lg bg-blue-50 p-4'>
            <div className='flex items-start space-x-3'>
              <CheckCircleIcon className='mt-0.5 h-5 w-5 text-blue-600' />
              <div className='text-left text-sm'>
                <p className='font-medium text-blue-900'>What to do next:</p>
                <ul className='mt-2 space-y-1 text-blue-700'>
                  <li>• Check your inbox (and spam folder)</li>
                  <li>• Click the reset link in the email</li>
                  <li>• The link expires in 15 minutes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className='space-y-3'>
            <Link
              href='/sign-in'
              className='inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
            >
              Back to Sign In
            </Link>

            <button
              onClick={() => window.location.reload()}
              className='text-muted-foreground w-full text-sm hover:text-gray-900'
            >
              Send another reset email
            </button>
          </div>
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

      <div className='mt-6 rounded-lg bg-amber-50 p-4'>
        <div className='text-left text-sm'>
          <p className='font-medium text-amber-900'>Security Notice:</p>
          <ul className='mt-2 space-y-1 text-amber-700'>
            <li>• Reset links expire in 15 minutes</li>
            <li>• Only verified email addresses will receive reset links</li>
            <li>• Check your spam folder if you don't see the email</li>
          </ul>
        </div>
      </div>
    </Form>
  );
}

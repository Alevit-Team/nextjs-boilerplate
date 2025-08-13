'use client';

import { useState } from 'react';
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
  Input,
  Button,
  Card,
} from '@/components';
import { resendVerificationEmail } from '../actions';
import { resendVerificationSchema } from '../schemas';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import { CheckCircleIcon, MailIcon, RefreshCwIcon } from 'lucide-react';

const defaultValues = {
  email: '',
};

export function EmailVerificationInstructions() {
  const [showResendForm, setShowResendForm] = useState(false);
  const [state, action, pending] = useActionState(
    resendVerificationEmail,
    null
  );
  const form = useForm<z.infer<typeof resendVerificationSchema>>({
    defaultValues,
    resolver: zodResolver(resendVerificationSchema),
    mode: 'onTouched',
  });

  const handleResendClick = () => {
    setShowResendForm(true);
  };

  return (
    <Card className='p-6'>
      <div className='text-center'>
        <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100'>
          <MailIcon className='h-8 w-8 text-blue-600' />
        </div>

        <h1 className='mb-2 text-2xl font-bold'>Check your email</h1>

        <p className='text-muted-foreground mb-6 text-sm'>
          We’ve sent a verification link to your email address. Please click the
          link to verify your account and complete the registration process.
        </p>

        <div className='mb-6 rounded-lg bg-blue-50 p-4'>
          <div className='flex items-start space-x-3'>
            <CheckCircleIcon className='mt-0.5 h-5 w-5 text-blue-600' />
            <div className='text-left text-sm'>
              <p className='font-medium text-blue-900'>What to do next:</p>
              <ul className='mt-2 space-y-1 text-blue-700'>
                <li>• Check your inbox (and spam folder)</li>
                <li>• Click the verification link in the email</li>
                <li>• Return here to sign in</li>
              </ul>
            </div>
          </div>
        </div>

        {!showResendForm ? (
          <div className='space-y-4'>
            <p className='text-muted-foreground text-sm'>
              Didn’t receive the email?
            </p>
            <Button
              variant='outline'
              onClick={handleResendClick}
              className='w-full'
            >
              <RefreshCwIcon className='mr-2 h-4 w-4' />
              Resend verification email
            </Button>
          </div>
        ) : (
          <div className='space-y-4'>
            <p className='text-muted-foreground text-sm'>
              Enter your email address to resend the verification link:
            </p>

            <Form {...form}>
              <div className='mb-3 h-9'>
                {state?.ok === false && (
                  <FormError label={getFormErrorMessage(state.errorCode)} />
                )}
                {state?.ok === true && (
                  <div className='text-sm font-medium text-green-600'>
                    Verification email sent! Please check your inbox.
                  </div>
                )}
              </div>

              <form action={action} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='Enter your email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex space-x-2'>
                  <Button
                    type='submit'
                    disabled={pending || !form.formState.isValid}
                    className='flex-1'
                  >
                    {pending ? 'Sending...' : 'Resend Email'}
                  </Button>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setShowResendForm(false)}
                    disabled={pending}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

        <div className='mt-6 border-t pt-4'>
          <p className='text-muted-foreground text-xs'>
            Already verified your email?{' '}
            <a href='/sign-in' className='text-blue-600 hover:underline'>
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </Card>
  );
}

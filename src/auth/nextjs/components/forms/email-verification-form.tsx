'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Button, AccountPrompt } from '@/components';
import { resendVerificationEmail } from '../actions';
import { resendVerificationSchema } from '../schemas';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import Link from 'next/link';

const defaultValues = {
  email: '',
};

export function EmailVerificationForm() {
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
    <div className='space-y-6 text-center'>
      {!showResendForm ? (
        <>
          <div className='space-y-4'>
            <h1 className='text-2xl font-bold'>Check your email</h1>
            <p className='text-muted-foreground text-sm'>
              We've sent a verification link to your email address. Please check
              your inbox and click the link to verify your account.
            </p>
          </div>

          <div className='space-y-4'>
            <p className='text-muted-foreground text-sm'>
              Didn't receive the email?
            </p>
            <Button onClick={handleResendClick} className='w-full'>
              Resend verification email
            </Button>
          </div>
        </>
      ) : (
        <Form {...form}>
          <Form.Header
            title='Resend verification email'
            description='Enter your email address to resend the verification link'
          />
          <div className='my-3 h-9'>
            {state?.ok === false && (
              <Form.Status variant='error'>
                {getFormErrorMessage(state.errorCode)}
              </Form.Status>
            )}
            {state?.ok === true && (
              <Form.Status variant='success'>
                Verification email sent! Please check your inbox.
              </Form.Status>
            )}
          </div>
          <form className='space-y-6' action={action}>
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
            <Button
              type='submit'
              disabled={pending || !form.formState.isValid}
              isLoading={pending}
              className='w-full'
            >
              {pending ? 'Sending' : 'Resend email'}
            </Button>
          </form>
        </Form>
      )}
      <AccountPrompt
        text='Already verified your email?'
        linkText='Sign in'
        href='/sign-in'
      />
    </div>
  );
}

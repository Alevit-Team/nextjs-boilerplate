'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Button } from '@/components';
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
    <>
      <div className='space-y-6 text-center'>
        <h1 className='text-2xl font-bold'>Verify your email</h1>
        {!showResendForm ? (
          <Button onClick={handleResendClick} className='w-full'>
            Resend verification email
          </Button>
        ) : (
          <div>
            <p className='text-muted-foreground text-center text-sm'>
              Enter your email address to resend the verification link
            </p>
            <Form {...form}>
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
              <form action={action}>
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
                  className='mt-4 w-full'
                >
                  {pending ? 'Sending' : 'Resend email'}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
      <p className='text-muted-foreground my-5 text-center text-sm'>
        Already verified your email?
        <Button variant='link' asChild>
          <Link href='/sign-in'>Sign in</Link>
        </Button>
      </p>
    </>
  );
}

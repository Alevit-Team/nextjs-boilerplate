'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Button } from '@/components';
import { ButtonPrompt } from '@/auth/nextjs/components/button-prompt';
import { resendVerificationEmail } from '@/auth/nextjs/actions';
import { resendVerificationSchema } from '@/auth/nextjs/schemas';
import { getFormErrorMessage } from '@/lib/get-form-error-message';

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
      {!showResendForm ? (
        <div className='space-y-8 text-center'>
          <h1 className='text-2xl font-bold'>Check your email</h1>
          <div className='space-y-4'>
            <p className='text-muted-foreground text-sm'>
              We've sent a verification link to your email address. Please check
              your inbox and click the link to verify your account.
            </p>
            <p className='text-muted-foreground text-sm'>
              Didn't receive the email?
            </p>
          </div>
          <Button onClick={handleResendClick} className='w-full'>
            Resend verification email
          </Button>
        </div>
      ) : (
        <Form
          title='Resend verification email'
          description='Enter your email address to resend the verification link'
        >
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
          <Form.Content action={action} form={form}>
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
          </Form.Content>
        </Form>
      )}
      <ButtonPrompt
        text='Already verified your email?'
        linkText='Sign in'
        className='mt-4'
        href='/sign-in'
      />
    </>
  );
}

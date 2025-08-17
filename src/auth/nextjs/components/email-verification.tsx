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
  FormStatus,
  Input,
  Button,
  FormHeader,
  FormMessage,
} from '@/components';
import { resendVerificationEmail } from '../actions';
import { resendVerificationSchema } from '../schemas';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import Link from 'next/link';

const defaultValues = {
  email: '',
};

export function EmailVerification() {
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
      <div className='space-y-6'>
        <FormHeader title='Verify your email'>
          <p className='text-muted-foreground text-sm'>
            We’ve sent a verification link to your email address.
            <br /> Please click the link to verify your account and complete the
            registration process.
          </p>
        </FormHeader>
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
                  <FormStatus
                    variant='error'
                    label={getFormErrorMessage(state.errorCode)}
                  />
                )}
                {state?.ok === true && (
                  <FormStatus
                    variant='success'
                    label='Verification email sent! Please check your inbox.'
                  />
                )}
              </div>
              <form action={action}>
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

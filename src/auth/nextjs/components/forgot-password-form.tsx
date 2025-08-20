'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  FormHeader,
  FormStatus,
  IconBadge,
} from '@/components';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useActionState } from 'react';
import { forgotPassword } from '../actions';
import { forgotPasswordSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, Key, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { getFormErrorMessage } from '@/lib/get-form-error-message';

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
        <FormHeader title='Check your email'>
          <p className='text-muted-foreground text-center text-sm'>
            We’ve sent you a reset link to{' '}
            <span className='font-medium'>{form.getValues('email')}</span>.
            <br />
            Please check your inbox and follow the instructions.
          </p>
        </FormHeader>
        <div className='mt-8 flex w-full flex-col items-center'>
          <Button asChild className='w-full'>
            <Link href='/sign-in'>Back to sign in</Link>
          </Button>
          <p className='text-muted-foreground my-5 text-center text-sm'>
            Didnt receive the email?
            <Button variant='link' onClick={() => window.location.reload()}>
              Send again
            </Button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center gap-6'>
      <IconBadge>
        <Key />
      </IconBadge>
      <div>
        <FormHeader
          title='Forgot password'
          description='Please enter your email and we will send you a link to reset your password.'
        />
        <Form {...form}>
          <div className='my-3 h-9'>
            {state?.ok === false && (
              <FormStatus
                variant='error'
                label={getFormErrorMessage(state.errorCode)}
              />
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
                    <Input type='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex w-full flex-col items-center'>
              <Button
                type='submit'
                className='w-full'
                disabled={!form.formState.isValid || pending}
                isLoading={pending}
              >
                {pending ? 'Sending reset email' : 'Send reset email'}
              </Button>
              <Link
                href='/sign-in'
                className='text-muted-foreground my-5 inline-flex items-center gap-2 text-sm hover:text-gray-900'
              >
                <ArrowLeftIcon className='h-4 w-4' /> Back to sign in
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

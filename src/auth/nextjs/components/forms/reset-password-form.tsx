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
  Container,
  Section,
} from '@/components';
import { resetPassword } from '@/auth/nextjs/actions';
import { resetPasswordSchema } from '@/auth/nextjs/schemas';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import { ArrowLeftIcon, CheckCircleIcon, Key } from 'lucide-react';
import Link from 'next/link';
import { PasswordValidation } from '@/auth/nextjs/components/password-validation';

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
      <Section>
        <Container className='max-w-md'>
          <div className='space-y-8 text-center'>
            <IconBadge>
              <CheckCircleIcon />
            </IconBadge>
            <h1 className='text-2xl font-bold'>Password reset!</h1>
            <p className='text-muted-foreground text-sm'>
              Your password has been successfully updated.
              <br />
              You can now sign in with your new password.
            </p>
            <Button asChild className='w-full'>
              <Link href='/sign-in'>Continue to sign in</Link>
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Form
      title='Enter new password'
      description='Your new password must be different from your previous passwords.'
    >
      <div className='my-3 h-9'>
        {state?.ok === false && (
          <Form.Status variant='error'>
            {getFormErrorMessage(state.errorCode)}
          </Form.Status>
        )}
      </div>
      <Form.Content action={action} form={form}>
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
        <div className='space-y-4'>
          <Button
            type='submit'
            className='w-full'
            disabled={!form.formState.isValid || pending}
            isLoading={pending}
          >
            {pending ? 'Resetting password' : 'Reset password'}
          </Button>
          <Button variant='link' asChild>
            <Link href='/sign-in'>
              <ArrowLeftIcon className='h-4 w-4' /> Back to sign in
            </Link>
          </Button>
        </div>
      </Form.Content>
    </Form>
  );
}

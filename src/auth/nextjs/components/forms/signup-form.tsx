'use client';

import {
  Form,
  PasswordInput,
  Button,
  Input,
  AccountPrompt,
  Separator,
} from '@/components';
import { signUp } from '@/auth/nextjs/actions';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useActionState } from 'react';
import { signUpSchema } from '@/auth/nextjs/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import { PasswordValidation } from '@/auth/nextjs/components/password-validation';
import { SocialLogin } from '@/auth/nextjs/components/social-login';

const defaultValues = {
  name: '',
  email: '',
  password: '',
};

export function SignUpForm() {
  const [state, action, pending] = useActionState(signUp, null);
  const form = useForm<z.infer<typeof signUpSchema>>({
    defaultValues,
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
  });

  return (
    <Form {...form}>
      <Form.Container
        title='Sign up'
        description='Create an account to get started'
      >
        <div className='my-3 h-9'>
          {state?.ok === false && (
            <Form.Status variant='error'>
              {getFormErrorMessage(state.errorCode)}
            </Form.Status>
          )}
        </div>
        <form action={action} className='w-full space-y-4'>
          {/* {error && <p className='text-destructive'>{error}</p>}
        <div className='flex gap-4'>
          <Button
            type='button'
            onClick={async () => await oAuthSignIn('discord')}
          >
            Discord
          </Button>
          <Button
            type='button'
            onClick={async () => await oAuthSignIn('github')}
          >
            GitHub
          </Button>
        </div> */}
          <Form.Field
            control={form.control}
            name='name'
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Name</Form.Label>
                <Form.Control>
                  <Input type='text' {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
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
          <Form.Field
            control={form.control}
            name='password'
            render={({ field }) => (
              <>
                <Form.Item>
                  <Form.Label>Password</Form.Label>
                  <Form.Control>
                    <PasswordInput showValidation={false} {...field} />
                  </Form.Control>
                </Form.Item>
                <PasswordValidation password={field.value} />
              </>
            )}
          />
          <div>
            <Button
              type='submit'
              className='w-full'
              disabled={!form.formState.isValid || pending}
              isLoading={pending}
            >
              {pending ? 'Signing up' : 'Sign up'}
            </Button>
            <AccountPrompt
              text='Already have an account?'
              linkText='Sign in'
              href='/sign-in'
            />
          </div>
        </form>
        <Separator label='Or continue with' className='my-6' />
        <SocialLogin />
      </Form.Container>
    </Form>
  );
}

'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormError,
  PasswordInput,
  Button,
  Input,
} from '@/components';
import { signUp } from '../actions';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useActionState } from 'react';
import { signUpSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import { PasswordValidation } from './password-validation';

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
      <form action={action} className='min-w-xs space-y-4'>
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
        {state?.ok === false && (
          <FormError label={getFormErrorMessage(state.errorCode)} />
        )}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} showValidation={false} />
                </FormControl>
              </FormItem>
              <PasswordValidation password={field.value} />
            </>
          )}
        />
        <div>
          <Button
            type='submit'
            className='w-full'
            disabled={pending || !form.formState.isValid}
          >
            {pending ? 'Signing up...' : 'Sign Up'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

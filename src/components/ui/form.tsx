'use client';

import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  FormProvider,
  useFormContext,
  UseFormReturn,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { cn } from '@/lib/utils';

import {
  ComponentProps,
  createContext,
  forwardRef,
  useContext,
  useId,
} from 'react';
import {
  Typography,
  Label,
  TypographyProps,
  Headline,
  Caption,
  Body,
} from './typography';

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

interface FormStatusProps extends ComponentProps<'div'> {
  variant: 'default' | 'error' | 'success';
}

interface FormContainerProps extends ComponentProps<'div'> {
  title?: string;
  description?: string;
}

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <Form.Field>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// Individual form components
function FormItem({ className, ...props }: ComponentProps<'div'>) {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot='form-item'
        className={cn('relative grid gap-2', className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: Omit<TypographyProps, 'variant' | 'as'> &
  React.LabelHTMLAttributes<HTMLLabelElement>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot='form-label'
      data-error={!!error}
      className={cn('text-left', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot='form-control'
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot='form-description'
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function FormMessage({
  className,
  ...props
}: Omit<ComponentProps<'p'>, 'color'>) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : props.children;

  if (!body) {
    return null;
  }

  return (
    <Typography
      variant='caption-md'
      data-slot='form-message'
      id={formMessageId}
      color='destructive'
      className={cn('absolute bottom-0 px-3 py-1', className)}
      {...props}
    >
      {body}
    </Typography>
  );
}

function FormContainer({
  title,
  description,
  className,
  children,
  ...props
}: FormContainerProps) {
  return (
    <div
      className={cn(
        'space-y-6 rounded-xl border p-6 pt-8 text-center',
        className
      )}
      {...props}
    >
      {title && <Headline size='lg'>{title}</Headline>}
      {description && <Body color='muted-foreground'>{description}</Body>}
      {children}
    </div>
  );
}

const FormStatus = forwardRef<HTMLDivElement, FormStatusProps>(
  ({ variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-muted rounded-md p-2 text-center text-sm',
          variant === 'error' && 'text-destructive bg-destructive/10',
          variant === 'success' && 'bg-green-50 text-green-600'
        )}
        {...props}
      />
    );
  }
);

FormStatus.displayName = 'FormStatus';

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FormContent = <TFieldValues extends FieldValues = FieldValues>({
  className,
  children,
  form,
  ...props
}: ComponentProps<'form'> & { form: UseFormReturn<TFieldValues> }) => {
  return (
    <FormProvider {...form}>
      <form className={cn('w-full space-y-5', className)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

const Form = Object.assign(FormContainer, {
  Content: FormContent,
  Provider: FormProvider,
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
  Status: FormStatus,
});

export { Form };

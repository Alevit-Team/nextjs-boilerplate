'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

// Context for form field state
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

// Hook to access form field state
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
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
function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId();

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
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot='form-label'
      data-error={!!error}
      className={className}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
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

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
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

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot='form-message'
      id={formMessageId}
      className={cn(
        'text-destructive absolute bottom-0 px-3 py-1 text-[12px]',
        className
      )}
      {...props}
    />
  );
}

const FormHeader = React.forwardRef<HTMLDivElement, FormHeaderProps>(
  ({ className, title, description, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('text-center', className)} {...props}>
        <h1 className='mb-8 text-2xl font-bold'>{title}</h1>
        {description && (
          <p className='text-muted-foreground text-sm'>{description}</p>
        )}
      </div>
    );
  }
);
FormHeader.displayName = 'FormHeader';

interface FormHeaderProps extends React.ComponentProps<'div'> {
  title: string;
  description?: string;
}

const FormStatus = React.forwardRef<HTMLDivElement, FormStatusProps>(
  ({ className, children, variant = 'default', ...props }, ref) => {
    return (
      <div
        className={cn(
          'bg-muted rounded-md p-2 text-center text-sm',
          variant === 'error' && 'text-destructive bg-destructive/10',
          variant === 'success' && 'bg-green-50 text-green-600'
        )}
      >
        {children}
      </div>
    );
  }
);

FormStatus.displayName = 'FormStatus';

interface FormStatusProps extends React.ComponentProps<'div'> {
  variant: 'default' | 'error' | 'success';
}

// Form Field component
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

// Main Form compound component
const Form = Object.assign(FormProvider, {
  Provider: FormProvider,
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
  Header: FormHeader,
  Status: FormStatus,
});

// Legacy exports for backward compatibility
export {
  useFormField,
  Form,
  FormHeader,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};

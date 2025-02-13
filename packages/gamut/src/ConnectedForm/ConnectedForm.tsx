import React, { useEffect, useMemo } from 'react';
import {
  FieldValues,
  FormProvider,
  FormProviderProps,
  Mode,
  Path,
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormProps,
} from 'react-hook-form';

import { Form } from '../Form';
import { FormProps } from '../Form/Form';
import { FormValues } from '../Form/types';
import { submitSuccessStatus } from './utils';

export interface FormContextProps {
  /**
   * If fields should be disabled while form is being submitted and after successful submission.
   */
  disableFieldsOnSubmit?: boolean;
  /**
   * If fields should be reset after successful submission.
   */
  resetOnSubmit?: boolean;
  /**
   * If required field should show asterisks in labels.
   */
  showRequired?: boolean;
  /**
   * Validation rules form fields. Fields with validation rules must have a defaultValue listed in the defaultValue prop.
   */
  validationRules?: { string?: RegisterOptions };
  /**
   * Sets if form submission was successful - if `undefined` will fall back to react-hook-forms native formState.isSubmitSuccessful.
   */
  wasSubmitSuccessful?: boolean;
}

export interface ConnectedFormProps<Values extends {}>
  extends Omit<FormContextProps, 'validationRules'>,
    Omit<FormProps, 'onSubmit'> {
  children?: React.ReactNode;

  /**
   * Function called with field values on submit, if all validations have passed.
   */
  onSubmit: SubmitHandler<Values>;

  /**
   * Default values are highly recommended for reliable form behavior, particularly resets.
   */
  defaultValues?: UseFormProps<Values>['defaultValues'];

  /**
   * Validation rules form fields. Fields with validation rules must have a defaultValue listed in the defaultValue prop.
   */
  validationRules?: { [Key in keyof Values]?: RegisterOptions };

  /**
   * Which react hook form mode we are going to use for validation.
   * If you use the onChange mode the submit button will be disabled until all
   * required fields are completed.
   */
  validation?: Mode;

  /**
   * An object that accepts an array of field names and a watchHandler that accepts a function, to be run onChange, that takes in an object of key/value pairs. The key is the field name and the value is the current value of the watched field.
   */
  watchedFields?: {
    fields: Path<Values>[];
    watchHandler: (arg0: Path<Values>[]) => void;
  };
}

export type FormProviderCustomProps = FormProviderProps & FormContextProps;

export const FormPropsContext = React.createContext<Partial<FormContextProps>>(
  {}
);
const PropsProvider = FormPropsContext.Provider;

export function ConnectedForm<Values extends FormValues<Values>>({
  children,
  onSubmit,
  defaultValues,
  validation = 'onChange',
  disableFieldsOnSubmit = false,
  resetOnSubmit = false,
  showRequired = false,
  validationRules,
  wasSubmitSuccessful = undefined,
  watchedFields,
  ...rest
}: ConnectedFormProps<Values>) {
  const {
    clearErrors,
    handleSubmit,
    formState,
    reset,
    trigger,
    watch,
    ...methods
  } = useForm<FieldValues>({
    defaultValues,
    mode: validation,
  });

  const onError = async () => {
    clearErrors();
    await trigger();
  };

  const isSubmitSuccessful = submitSuccessStatus(
    wasSubmitSuccessful,
    formState.isSubmitSuccessful
  );

  if (watchedFields) {
    // we're pretty exhaustively type-checking the props as they're passed in, so its fine to cast here.
    const fields = watch(watchedFields.fields);
    watchedFields.watchHandler(fields as any);
  }

  useEffect(() => {
    if (isSubmitSuccessful && resetOnSubmit) {
      reset(defaultValues);
    }
  }, [isSubmitSuccessful, resetOnSubmit, reset, defaultValues]);

  const contextValues = useMemo(() => {
    return {
      disableFieldsOnSubmit,
      resetOnSubmit,
      showRequired,
      validationRules,
      wasSubmitSuccessful,
    };
  }, [
    disableFieldsOnSubmit,
    resetOnSubmit,
    showRequired,
    validationRules,
    wasSubmitSuccessful,
  ]);

  return (
    <PropsProvider value={contextValues}>
      <FormProvider
        clearErrors={clearErrors}
        handleSubmit={handleSubmit}
        formState={formState}
        reset={reset}
        trigger={trigger}
        watch={watch}
        {...methods}
      >
        <Form onSubmit={handleSubmit(onSubmit, onError)} {...rest}>
          {children}
        </Form>
      </FormProvider>
    </PropsProvider>
  );
}

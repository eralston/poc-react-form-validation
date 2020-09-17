import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export interface IExampleFormProps {
  /** The id on the form element. This will allow a button to submit this form from the outside, 
   * if the button has the attribute form={formId} to match this. */
  formId: string;
  onSubmit: SubmitHandler<IExampleFormValues>;
}

export interface IExampleFormValues {
  email: string;
  password: string;
  textarea: string;
  file: string;
  checkbox: boolean;
}

const RESERVED_EMAILS = [
  't@ken.com',
  'dont@use.com',
];

async function validateAvailableEmail(email: string): Promise<string | undefined> {

  // simulate a 1 second API call to validate against the server
  await new Promise(r => setTimeout(r, 1000));

  if (RESERVED_EMAILS.indexOf(email) >= 0) {
    return `The email ${email} is already taken. Are you sure I haven't seen you before?`;
  }
  return void 0;
}

const ExampleForm = ({ formId, onSubmit }: IExampleFormProps) => {
  // register each form control to get it in the submit data, and pass in validation rules
  // NOTE: be sure to pass to innerRef so the reactstrap puts it on the actual html form control element
  // handleSubmit takes a callback, we pass in the onSubmit from parent
  // errors is an object that has properties of any invalid values that are registered
  // trigger will run a validate on the prop whose name was passed in, in case we don't want to wait for submit
  const { register, handleSubmit, errors, trigger } = useForm<IExampleFormValues>();

  // micro optimization, preserve the callback instance in case changing it would cause a re-render on the child element
  const triggerEmail = useCallback(() => trigger('email'), [trigger]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="with a placeholder"
          // validate the email whenever it changes to get a head start on server request
          onChange={triggerEmail}
          // use a custom string for each type of validation error
          innerRef={register({ required: 'Email is required', validate: validateAvailableEmail })}
        />
        {errors.email && <FormText color="danger">{errors.email.message}</FormText>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="examplePassword"
          placeholder="password placeholder"
          innerRef={register({
            required: true,
            pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])/,
            minLength: 8,
            maxLength: 20,
          })}
        />
        {errors.password && (
          <FormText color="danger">
            Password must have a number, a lowercase letter,
            an uppercase letter, a special character from this list !@#$%^&amp;*(),
            and be between 8 and 20 characters long.
          </FormText>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Text Area</Label>
        <Input type="textarea" name="text" id="exampleText" innerRef={register} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="file" id="exampleFile" innerRef={register} />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="checkbox"
            // return the error message if not checked, or undefined.
            innerRef={register({ validate: d => d ? void 0 : 'You must check me out.' })}
          />
          Check me out
        </Label>
        {errors.checkbox && <FormText color="danger">{errors.checkbox.message}</FormText>}
      </FormGroup>
    </Form>
  );
}

export default ExampleForm;
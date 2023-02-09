import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, Form } from 'formik';
import { Input } from './Input';
import * as yup from 'yup';
import '@testing-library/jest-dom/extend-expect';

const renderInput = (inputInitialValue: string = '') => {
  render(
    <Formik
      initialValues={{
        name: inputInitialValue,
      }}
      onSubmit={jest.fn()}
      validationSchema={yup.object().shape({
        name: yup.string().required(),
      })}
    >
      <Form>
        <Input name='name' label='Name' />
        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  )
}

describe('Input', () => {
  it('should render', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    expect(input).toBeDefined();
  })

  it('should display initial value', () => {
    const initialValue = 'Initial name value';
    renderInput(initialValue);
    expect(screen.getByDisplayValue(initialValue)).toBeInTheDocument();
  })

  it('should display error', async () => {
    renderInput();
    await userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText(/name is a required field/i)).toBeInTheDocument();
    })
  })
})

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import { TaskForm } from './TaskForm';

const handleSubmit = jest.fn();

const task = {
  name: 'Awesome task',
  description: 'Awesome task description',
}

describe('TaskForm', () => {
  it('should submit valid form', async () => {
    render(<TaskForm handleSubmit={handleSubmit} />);

    await userEvent.type(screen.getByLabelText(/task name/i), task.name);
    await userEvent.type(screen.getByLabelText(/task description/i), task.description);

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(task, expect.anything());
    })
  })

  it('should not submit invalid form', async () => {
    render(<TaskForm handleSubmit={handleSubmit} />);
    await userEvent.type(screen.getByLabelText(/task name/i), 'name');
    await userEvent.type(screen.getByLabelText(/task description/i), 'description');

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(0);
    })
  })

  it('should display submit button text', () => {
    render(<TaskForm handleSubmit={handleSubmit} submitText='Custom submit text' />);
    expect(screen.getByRole('button')).toHaveTextContent('Custom submit text');
  })

  it('should display initial input values', () => {
    const task = {
      id: '1',
      name: 'Initial name value',
      description: 'Initial description value'
    }
    render(<TaskForm handleSubmit={handleSubmit} initialValues={task} />);
    expect(screen.getByDisplayValue(task.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(task.description)).toBeInTheDocument();
  })
})

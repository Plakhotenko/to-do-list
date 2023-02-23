import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import { UpdateTaskModal } from './UpdateTaskModal';

const handleClose = jest.fn();
const handleSubmit = jest.fn();
const task = {
  id: '1',
  name: 'Task name',
  description: 'Awesome task description',
}

describe('UpdateTaskModal', () => {
  it('should render modal', () => {
    render(
      <UpdateTaskModal
        isOpen={true}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        task={task}
      />
    )
    expect(screen.getByText(/edit task/i)).toBeInTheDocument();
  })

  it('should not render modal', () => {
    render(
      <UpdateTaskModal
        isOpen={false}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        task={task}
      />
    )
    expect(screen.queryByText(/edit text/i)).not.toBeInTheDocument();
  })

  it('should hide model on close button click', async () => {
    render(
      <UpdateTaskModal
        isOpen={true}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        task={task}
      />
    )
    await userEvent.click(screen.getByLabelText('close'));
    expect(handleClose).toHaveBeenCalled();
  })

  it('should submit update form', async () => {
    render(
      <UpdateTaskModal
        isOpen={true}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        task={task}
      />
    )
    await userEvent.click(screen.getByText(/update/i));
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: task.name,
        description: task.description,
      }, expect.anything());
    })
  })
})

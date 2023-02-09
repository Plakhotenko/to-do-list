import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Task, ITask } from './Task';

const task: ITask = {
  id: '1',
  name: 'Task name',
  description: 'Awesome task description',
  isComplete: false,
}

const handleDelete = jest.fn();
const handleComplete = jest.fn();
const handleEdit = jest.fn();

const renderTask = () => {
  render(
    <Task
      task={task}
      handleComplete={handleComplete}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />)
}

describe('Task', () => {
  it('should render title', async () => {
    renderTask();
    const title = screen.getByText(task.name);
    expect(title).toBeDefined();
  })

  it('should render description', () => {
    renderTask();
    const description = screen.getByText(task.description);
    expect(description).toBeDefined();
  })

  it('should call handleDelete', () => {
    renderTask();
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalledTimes(1);
  })

  it('should call handleEdit', () => {
    renderTask();
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    expect(handleEdit).toHaveBeenCalledTimes(1);
  })

  it('should call handleComplete', () => {
    renderTask();
    const completeButton = screen.getByText('Mark as complete');
    fireEvent.click(completeButton);
    expect(handleComplete).toHaveBeenCalledTimes(1);
  })
})

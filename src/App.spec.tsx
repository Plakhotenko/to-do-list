import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import * as crypto from 'crypto';

import App from './App';
import {ITask} from "./components/Task";

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => crypto.randomUUID()
  }
});

const task = {
  id: '1',
  name: 'Task name 123',
  description: 'Awesome task description 123'
};

const createNewTask = async (task: ITask) => {

  await userEvent.type(screen.getByLabelText(/task name/i), task.name);
  await userEvent.type(screen.getByLabelText(/task description/i), task.description);

  await userEvent.click(screen.getByText(/create/i));
}

describe('App', () => {
  afterEach(() => {
    localStorage.removeItem('tasks');
  })

  it('should render logo', async () => {
    render(<App />);
    expect(screen.getByText('ToDo List')).toBeInTheDocument();
  })

  it('should render task cached in localStorage', () => {
    const task = {
      id: '2',
      name: 'Local storage task',
      description: 'Local storage task description'
    }
    localStorage.setItem('tasks', JSON.stringify([task]));

    render(<App />);
    expect(screen.getByText(task.name)).toBeInTheDocument();
    expect(screen.getByText(task.description)).toBeInTheDocument();
  })

  it('should create new task', async () => {
    render(<App />);
    await createNewTask(task);
    await waitFor(() => {
      expect(screen.getByText(task.name)).toBeInTheDocument();
    })
    await waitFor(() => {
      expect(screen.getByText(task.description)).toBeInTheDocument();
    })
  })

  it('should mark task as complete', async () => {
    render(<App />);
    await createNewTask(task);
    await waitFor(async () => {
      await userEvent.click(screen.getByText(/mark as complete/i));
    })
    await waitFor(() => {
      expect(screen.getByText(/edit/i)).toBeDisabled();
    })
    await waitFor(() => {
      expect(screen.getByText(/mark as complete/i)).toBeDisabled();
    })
  })

  it('should remove task', async () => {
    const task = {
      id: '3',
      name: 'Task to delete',
      description: 'Task to delete. Description'
    }
    render(<App />);
    await createNewTask(task);

    await waitFor(async () => {
      await userEvent.click(screen.getByRole('button', {
        name: /delete/i
      }));
    })
    await waitFor(() => {
      expect(screen.queryByText(task.name)).not.toBeInTheDocument();
    })
    await waitFor(() => {
      expect(screen.queryByText(task.description)).not.toBeInTheDocument();
    })
  })

  it('should update localStorage when task is created', async () => {
    render(<App />);
    await createNewTask(task);
    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem('tasks') as string)).toEqual([{
        ...task,
        id: expect.any(String),
      }])
    })
  })

  it('should open modal', async () => {
    render(<App />);
    await createNewTask(task);
    await waitFor(async () => {
      await userEvent.click(screen.getByText(/edit/i));
    })
    expect(screen.getByText(/edit task/i)).toBeInTheDocument();
  })
})

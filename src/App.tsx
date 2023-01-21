import { FC, useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { ITask, Task } from "./Task";
import { CreateTaskForm } from "./CreateTaskForm";

const useTasks = () => {
  const getInitialState = () => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      return JSON.parse(tasks);
    }
    return [];
  };

  const [tasks, setTasks] = useState<ITask[]>(getInitialState());

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onTaskCreate = (
    { name, description }: Omit<ITask, "id">,
    { resetForm }: { resetForm: Function }
  ) => {
    setTasks((tasks) => [
      ...tasks,
      {
        id: crypto.randomUUID(),
        name,
        description,
      },
    ]);
    resetForm();
  };

  const onTaskDelete = (id: ITask["id"]) => () => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const onTaskComplete = (id: ITask["id"]) => () => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id !== id) return task;
        return {
          ...task,
          isComplete: true,
        };
      })
    );
  };

  return {
    tasks,
    onTaskCreate,
    onTaskDelete,
    onTaskComplete,
  };
};

const App: FC = () => {
  const { tasks, onTaskCreate, onTaskDelete, onTaskComplete } = useTasks();

  return (
    <div className="layout">
      <header className="header">
        <Typography mb={2} variant="h3" component="h1">
          ToDo List
        </Typography>
      </header>
      <div className="aside">
        <CreateTaskForm onTaskCreate={onTaskCreate} />
      </div>
      <main className="main">
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <Task
                task={task}
                handleDelete={onTaskDelete(task.id)}
                handleComplete={onTaskComplete(task.id)}
              ></Task>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;

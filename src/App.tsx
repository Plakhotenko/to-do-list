import React, { FC, useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { ITask, Task } from "./components/Task";
import { TaskForm } from "./components/TaskForm";
import { UpdateTaskModal } from "./components/UpdateTaskModal";

const useTasks = () => {
  const getInitialState = () => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      return JSON.parse(tasks);
    }
    return [];
  };

  const [tasks, setTasks] = useState<ITask[]>(getInitialState());

  const [isModalOpen, setModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | undefined>(
    undefined
  );

  const handleTaskEdit = (id: ITask["id"]) => {
    setSelectedTask(tasks.find((task) => task.id === id));
    setModal(true);
  };

  const handleClose = () => setModal(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskCreate = (
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

  const handleTaskUpdate =
    (id: ITask["id"]) =>
    ({ name, description }: Pick<ITask, "name" | "description">) => {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === id ? { ...task, name, description } : task
        )
      );
      setModal(false);
    };

  const handleTaskDelete = (id: ITask["id"]) => () => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const handleTaskComplete = (id: ITask["id"]) => () => {
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
    handleTaskCreate,
    handleTaskUpdate,
    handleTaskDelete,
    handleTaskComplete,
    isModalOpen,
    handleTaskEdit,
    handleClose,
    selectedTask,
  };
};

const App: FC = () => {
  const {
    tasks,
    handleTaskCreate,
    handleTaskUpdate,
    handleTaskDelete,
    handleTaskComplete,
    isModalOpen,
    handleTaskEdit,
    handleClose,
    selectedTask,
  } = useTasks();

  return (
    <>
      <div className="layout">
        <header className="header">
          <Typography mb={2} variant="h3" component="h1">
            ToDo List
          </Typography>
        </header>
        <div className="aside">
          <TaskForm handleSubmit={handleTaskCreate} />
        </div>
        <main className="main">
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id}>
                <Task
                  task={task}
                  handleDelete={handleTaskDelete(task.id)}
                  handleComplete={handleTaskComplete(task.id)}
                  handleEdit={() => handleTaskEdit(task.id)}
                ></Task>
              </li>
            ))}
          </ul>
        </main>
      </div>
      <UpdateTaskModal
        isOpen={isModalOpen}
        handleClose={handleClose}
        handleSubmit={handleTaskUpdate(selectedTask?.id || "")}
        task={selectedTask}
      />
    </>
  );
};

export default App;

import React, { FC } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TaskForm } from "./TaskForm";
import { FormikSubmitHandler } from "./TaskForm";
import { ITask } from "./Task";

export const UpdateTaskModal: FC<{
  isOpen: boolean;
  handleClose: (event: any) => void;
  handleSubmit: FormikSubmitHandler;
  task: ITask | undefined;
}> = ({ isOpen, handleClose, handleSubmit, task }) => {
  return (
    <Modal open={isOpen} onClose={handleClose} className="main-modal">
      <Box
        sx={{
          p: 4,
          width: 400,
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <IconButton
          aria-label="close"
          className="modal-close-button"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" mb={2}>
          Edit task
        </Typography>
        <TaskForm
          handleSubmit={handleSubmit}
          submitText="Update"
          initialValues={task}
        />
      </Box>
    </Modal>
  );
};

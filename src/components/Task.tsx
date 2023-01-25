import React, { FC, MouseEventHandler } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

export interface ITask {
  id: string;
  name: string;
  description: string;
  isComplete?: boolean;
}

export const Task: FC<{
  task: ITask;
  handleDelete: MouseEventHandler;
  handleComplete: MouseEventHandler;
  handleEdit: MouseEventHandler;
}> = ({
  task: { name, description, isComplete },
  handleDelete,
  handleComplete,
  handleEdit,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className={isComplete ? "line-through" : ""}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          disabled={isComplete}
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          endIcon={<CheckIcon />}
          disabled={isComplete}
          onClick={handleComplete}
        >
          Mark as complete
        </Button>
      </CardActions>
    </Card>
  );
};

import {
  Favorite, FavoriteBorder,
} from '@mui/icons-material';
import {
  Card, CardContent, Typography, CardActions, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import dayjs from 'dayjs';
import { useState } from 'react';
import { TTask, updateTask } from '../store/modules/tasks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { DialogEditTask } from './DialogEditTask';
import { DialogDeleteTask } from './DialogDeleteTask';

interface CustomCardProps {
    task: TTask
}

export const CustomCard = ({ task } : CustomCardProps) => {
  const user = useAppSelector((state) => state.userLogged);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const dispatch = useAppDispatch();

  const handleFavorite = () => {
    dispatch(updateTask({
      idUser: user.id,
      idTask: task.idTask,
      authorization: user.token,
      task: {
        favorite: !task.favorite,
      },
    }));
  };

  const handleFinished = () => {
    dispatch(updateTask({
      idUser: user.id,
      idTask: task.idTask,
      authorization: user.token,
      task: {
        finished: !task.finished,
      },
    }));
  };

  return (
    <Card className="p-2 h-full">
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" marginTop={2}>
          {dayjs(task.date).format('DD/MM/YYYY')}
        </Typography>

      </CardContent>
      <CardActions>
        <IconButton onClick={handleFinished}>
          {task.finished ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon /> }
        </IconButton>

        <IconButton onClick={handleFavorite}>
          {task.favorite ? <Favorite color="error" /> : <FavoriteBorder /> }
        </IconButton>

        <IconButton onClick={() => setOpenModalEdit(true)} color="success">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => setOpenModalDelete(true)} color="warning">
          <DeleteIcon />
        </IconButton>

      </CardActions>
      <DialogEditTask
        open={openModalEdit}
        task={task}
        handleClose={() => setOpenModalEdit(false)}
      />
      <DialogDeleteTask
        open={openModalDelete}
        task={task}
        handleClose={() => setOpenModalDelete(false)}
      />
    </Card>
  );
};

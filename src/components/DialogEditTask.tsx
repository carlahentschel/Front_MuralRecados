import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,
} from '@mui/material';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  TTask, updateTask,
} from '../store/modules/tasks';
import DatePickerValue from './DatePicker';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAlert } from '../store/modules/alert';

interface DialogTaskProp {
    task: TTask,
    open: boolean,
    handleClose(): void
}

export const DialogEditTask = ({ task, open, handleClose }: DialogTaskProp) => {
  const user = useAppSelector((state) => state.userLogged);
  const [taskEdited, setTaskEdited] = useState(task);
  const dispatch = useAppDispatch();

  const resetForm = () => setTaskEdited(task);
  const handleEdit = () => {
    dispatch(updateTask({
      idUser: user.id,
      task: taskEdited,
      authorization: user.token,
    }));
    handleClose();
    dispatch(setAlert({
      msg: 'Recado editado com sucesso!',
      type: 'success',
    }));

    resetForm();
  };
  const handleSetDate = (date: Dayjs | null) => {
    setTaskEdited((state) => ({ ...state, date: date?.toDate() as Date }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar recado:</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="task"
          label="Tarefa"
          type="text"
          fullWidth
          variant="standard"
          value={taskEdited.title}
          onChange={(e) => setTaskEdited((state) => ({ ...state, title: e.target.value }))}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Descrição"
          type="text"
          fullWidth
          variant="standard"
          value={taskEdited.description}
          onChange={(e) => setTaskEdited((state) => ({ ...state, description: e.target.value }))}
        />
        <DatePickerValue date={dayjs(taskEdited.date)} setDate={handleSetDate} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleEdit}>Editar</Button>
      </DialogActions>
    </Dialog>
  );
};

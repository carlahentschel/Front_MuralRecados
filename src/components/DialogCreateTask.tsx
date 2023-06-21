import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { TCreateTask, createTask } from '../store/modules/tasks';
import DatePickerValue from './DatePicker';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAlert } from '../store/modules/alert';

export const DialogCreateTask = () => {
  const user = useAppSelector((state) => state.userLogged);
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<TCreateTask>({ title: '', description: '', date: new Date() });
  const dispatch = useAppDispatch();

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const resetForm = () => setTask({ title: '', description: '', date: new Date() });
  const handleSave = () => {
    dispatch(createTask({
      idUser: user.id,
      task,
      authorization: user.token,
    }));
    handleClose();
    dispatch(setAlert({
      msg: 'Recado criado com sucesso!',
      type: 'success',
    }));

    resetForm();
  };
  const handleSetDate = (date: Dayjs | null) => {
    setTask((state) => ({ ...state, date: date?.toDate() as Date }));
  };

  return (
    <>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Criar recado:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="task"
            label="Tarefa"
            type="text"
            fullWidth
            variant="standard"
            value={task.title}
            onChange={(e) => setTask((state) => ({ ...state, title: e.target.value }))}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Descrição"
            type="text"
            fullWidth
            variant="standard"
            value={task.description}
            onChange={(e) => setTask((state) => ({ ...state, description: e.target.value }))}
          />
          <DatePickerValue date={dayjs(task.date)} setDate={handleSetDate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave}>Criar</Button>
        </DialogActions>
      </Dialog>

      <Fab
        onClick={handleOpen}
        color="primary"
        aria-label="add"
        size="small"
        sx={{ position: 'fixed', right: '20px', bottom: '20px' }}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

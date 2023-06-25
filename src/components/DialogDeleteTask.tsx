import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { TTask, deleteTask } from '../store/modules/tasks';
import { useAppDispatch, useAppSelector } from '../store/hooks';

interface DialogDeleteTaskProp {
    task: TTask,
    open: boolean,
    handleClose(): void
}

export const DialogDeleteTask = ({ task, open, handleClose }: DialogDeleteTaskProp) => {
  const user = useAppSelector((state) => state.userLogged);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteTask({
      idTask: task.idTask,
      idUser: user.id,
      authorization: user.token,
    }));
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir este recado?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

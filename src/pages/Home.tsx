import { useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Container, Divider,
  Grid, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import {
  getTasks, taskAdapter,
} from '../store/modules/tasks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { DialogCreateTask } from '../components/DialogCreateTask';
import { CustomCard } from '../components/CustomCard';

export function Home() {
  const user = useAppSelector((state) => state.userLogged);
  const tasks = useAppSelector(taskAdapter.selectAll);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      dispatch(getTasks({
        idUser: user.id,
        authorization: user.token,
      }));
    }
  }, []);

  useEffect(() => {
    if (!user.id) {
      navigate('/');
    }
  }, [user]);

  const handleFavorite = () => {
    navigate('/favorites');
  };

  const handleCompletedTasks = () => {
    navigate('/completedTasks');
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <ResponsiveAppBar userLogged={`Bem-vindo(a), ${user.name}!`} />
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ marginTop: '20px' }}>

          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={handleFavorite}>RECADOS FAVORITOS</Button>
            <Button onClick={handleCompletedTasks}>RECADOS FINALIZADOS</Button>
          </ButtonGroup>
          <Typography variant="h5" marginTop={3} marginBottom={1}>Organize e gerencie sua agenda para deixar sua rotina mais tranquila!</Typography>
          <Divider />
          <Grid container spacing={2} marginTop={3}>
            {tasks.map((t) => (
              <Grid key={t.idTask} item xs={12} sm={6} md={3}>
                <CustomCard task={t} />
              </Grid>

            ))}

          </Grid>
        </Container>
      </Grid>
      <DialogCreateTask />
    </Grid>
  );
}

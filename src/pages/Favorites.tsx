import {
  Button,
  ButtonGroup,
  Container, Divider,
  Grid, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import {
  taskAdapter,
} from '../store/modules/tasks';
import { useAppSelector } from '../store/hooks';
import { CustomCard } from '../components/CustomCard';

export function Favorites() {
  const user = useAppSelector((state) => state.userLogged);
  const tasks = useAppSelector(taskAdapter.selectAll);
  const navigate = useNavigate();

  const handleAllTasks = () => {
    navigate('/home');
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <ResponsiveAppBar userLogged={`Bem-vindo(a), ${user.name}!`} />
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ marginTop: '20px' }}>

          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={handleAllTasks}>VOLTAR PARA TODOS OS RECADOS</Button>
          </ButtonGroup>
          <Typography variant="h5" marginTop={3}>Organize e gerencie sua agenda para deixar sua rotina mais tranquila.</Typography>
          <Divider />
          <Grid container gap={2} marginTop={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography>aqui tem que filtrar os recados favoritos</Typography>
              {tasks.filter((t) => t.favorite).map((t) => (
                <Grid key={t.idTask} item xs={12} sm={6} md={3}>
                  <CustomCard task={t} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}

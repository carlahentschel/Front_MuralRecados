import {
  Button,
  ButtonGroup,
  Container,
  Grid,
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
          <Grid container spacing={2} marginTop={3}>
            {tasks.filter((t) => t.favorite === true).map((t) => (
              <Grid key={t.idTask} item xs={12} sm={6} md={3}>
                <CustomCard task={t} />
              </Grid>
            ))}

          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}

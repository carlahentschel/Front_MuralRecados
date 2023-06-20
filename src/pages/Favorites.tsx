import { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card, CardActions, CardContent, Container, Divider,
  Grid, IconButton, Typography,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import dayjs from 'dayjs';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import {
  createTask, deleteTask, getTasks, taskAdapter,
} from '../store/modules/tasks';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function Home() {
  const user = useAppSelector((state) => state.userLogged);
  const tasks = useAppSelector(taskAdapter.selectAll);
  const dispatch = useAppDispatch();

  return (
    <Grid container>
      <Grid item xs={12}>
        <ResponsiveAppBar userLogged={`Bem-vindo(a), ${user.name}!`} />
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ marginTop: '20px' }}>

          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>VOLTAR PARA TODOS OS RECADOS</Button>
          </ButtonGroup>
          <Typography variant="h5" marginTop={3}>Organize e gerencie sua agenda para deixar sua rotina mais tranquila.</Typography>
          <Divider />
          <Grid container gap={2} marginTop={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ maxWidth: 380 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Title
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body2" color="text.secondary" marginTop={2}>
                    {dayjs(new Date()).format('DD/MM/YYYY')}
                  </Typography>

                </CardContent>
                <CardActions>
                  <IconButton>
                    <CheckBoxIcon />
                  </IconButton>
                  <IconButton>
                    <CheckBoxOutlineBlankIcon />
                  </IconButton>
                  <IconButton color="error">
                    <Favorite />
                  </IconButton>
                  <IconButton>
                    <FavoriteBorder />
                  </IconButton>
                  <IconButton color="success">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="warning">
                    <DeleteIcon />
                  </IconButton>

                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}

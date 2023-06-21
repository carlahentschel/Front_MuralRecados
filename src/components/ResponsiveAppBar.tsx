import {
  AppBar, Container, Toolbar, Typography, Box, Button,
} from '@mui/material';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/modules/userLogged';

interface ResponsiveAppBarProps {
  userLogged: string;
}

function ResponsiveAppBar({ userLogged }: ResponsiveAppBarProps) {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {userLogged}
          </Typography>

          <Typography
            variant="body2"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {userLogged}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Button onClick={handleLogout} color="inherit">
              Sair
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

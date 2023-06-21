import { Alert, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { closeAlert } from '../store/modules/alert';

const Feedback = () => {
  const alert = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (alert.show) {
      setTimeout(() => dispatch(closeAlert()), 5000);
    }
  }, [alert]);

  return (
    alert.show
      ? (
        <Stack
          sx={{
            width: '300px', position: 'fixed', top: '65px', right: '35px',
          }}
          spacing={2}
        >
          <Alert severity={alert.type}>{alert.msg}</Alert>
        </Stack>
      ) : undefined

  );
};

export default Feedback;

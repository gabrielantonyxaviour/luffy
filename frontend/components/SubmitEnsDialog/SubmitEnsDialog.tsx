'use client';

import { useState, useEffect, Fragment, FormEvent } from 'react';
import { Dialog, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Stack } from '@mui/material';
import { useGeneralContext } from '@/contexts';
import { useClientAuth } from '@/hooks';

export const SubmitEnsDialog = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useClientAuth();
  const { setEns } = useGeneralContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const subdomain = formJson.subdomain;
    setIsSubmitting(true);

    setTimeout(() => {
      setEns(`${subdomain}.luffy.eth`);
      setIsSubmitting(false);
      handleClose();
    }, 3000);
  };

  useEffect(() => {
    if (isAuthenticated) {
      // handleClickOpen();
    }
  }, [isAuthenticated]);

  return (
    <Fragment>
      <Dialog
        open={open}
        PaperProps={{
          component: 'form',
          onSubmit
        }}
      >
        <DialogTitle variant='h5'>Luffy subdomain</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To continue, please choose a Luffy subdomain
          </DialogContentText>
          <Stack direction='row' spacing={2} alignItems='flex-end'>
            <TextField
              autoFocus
              required
              margin='dense'
              id='name'
              name='subdomain'
              placeholder='Subdomain'
              fullWidth
              variant='standard'
            />
            <Typography fontWeight={700}>.luffy.eth</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type='submit'
            variant='outlined'
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

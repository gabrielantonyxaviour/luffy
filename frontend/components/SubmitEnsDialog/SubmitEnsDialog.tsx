'use client';

import { useState, Fragment, FormEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Stack } from '@mui/material';

export const SubmitEnsDialog = () => {
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        PaperProps={{
          component: 'form',
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const subdomain = formJson.subdomain;
            console.log({ subdomain });
            handleClose();
          }
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
          <Button type='submit' variant='outlined'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

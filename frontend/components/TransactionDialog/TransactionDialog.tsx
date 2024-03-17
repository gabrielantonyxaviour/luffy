'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Button, Typography, Modal, Stack } from '@mui/material';
import { Stepper } from './Stepper';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 400,
  backgroundColor: '#0a192b',
  borderRadius: 2,
  paddingY: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

type TransactionDialogProps = {
  activeStep: number;
  currency: 'CZH' | 'APE';
  amount: string;
  sourceTransactionHash: string;
  sourceTransactionLink: string;
  destinationTransactionHash: string;
  destinationTransactionLink: string;
  open: boolean;
  onClose: () => void;
};

export const TransactionDialog: React.FC<TransactionDialogProps> = ({
  activeStep,
  currency,
  amount,
  sourceTransactionHash,
  sourceTransactionLink,
  destinationTransactionHash,
  destinationTransactionLink,
  open,
  onClose
}) => {
  return (
    <Box>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Stepper activeStep={activeStep} />
          <Typography variant='h5' marginTop={3}>
            Funds added
          </Typography>
          <Typography marginY={3}>
            Congratulations {amount} {currency} added to your account
          </Typography>
          <Box
            sx={{
              width: '90%',
              padding: 1.5,
              border: '1px solid #ffffff11',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Stack alignItems='center' marginBottom={1}>
              <Typography fontWeight={300}>
                View your source transaction here:
              </Typography>
              <Link href={sourceTransactionLink} style={{ color: '#ad7624' }}>
                {sourceTransactionHash}
              </Link>
            </Stack>
            <Stack alignItems='center'>
              <Typography fontWeight={300}>
                View your source source here:
              </Typography>
              <Link
                href={destinationTransactionLink}
                style={{ color: '#ad7624' }}
              >
                {destinationTransactionHash}
              </Link>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

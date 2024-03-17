import { Box, Button, Stack, Typography } from '@mui/material';

const styles = {
  container: {
    backgroundColor: '#102640',
    border: '1px solid #ffffff22',
    padding: 2,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 2,
    gap: 1
  }
};

export const ResultsCard = () => {
  return (
    <Box sx={styles.container}>
      <Stack direction='row' justifyContent='space-between' spacing={5}>
        <Stack>
          <Typography fontWeight={500}>Result:</Typography>
          <Typography fontWeight={500}>Reward:</Typography>
        </Stack>
        <Stack alignItems='flex-end'>
          <Typography fontWeight={300}>12 points</Typography>
          <Typography fontWeight={300}>100 CZH</Typography>
        </Stack>
      </Stack>
      <Button variant='contained' size='small'>
        Claim
      </Button>
    </Box>
  );
};

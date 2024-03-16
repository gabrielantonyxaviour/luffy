import { Box, Typography } from '@mui/material';
import { useGeneralContext } from '@/contexts';

const styles = {
  container: {
    width: '100%',
    minHeight: '500px',
    backgroundColor: '#102640',
    border: '1px solid #ffffff22',
    borderRadius: 2,
    padding: 2
  }
};

export const Logger = () => {
  const { logs } = useGeneralContext();

  return (
    <Box sx={styles.container}>
      {logs.map((log, index) => (
        <Typography key={index} fontWeight={500} marginBottom={1}>
          {`[${index + 1}] ${log}`}
        </Typography>
      ))}
    </Box>
  );
};

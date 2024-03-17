import { Box, Button, Stack, Typography } from "@mui/material";

const styles = {
  container: {
    backgroundColor: "#102640",
    border: "1px solid #ffffff22",
    padding: 2,
    display: "flex",
    flexDirection: "row",
    borderRadius: 2,
    gap: 1,
    width: "520px",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
};

type ResultsCardProps = {
  points: string;
  rewards: string;
  currency: "CHZ" | "APE";
  generateProof: any;
};

export const ResultsCard: React.FC<ResultsCardProps> = ({
  points,
  rewards,
  currency,
  generateProof,
}) => {
  return (
    <Box sx={styles.container}>
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Typography variant="h5">Result</Typography>
        <Typography fontSize={20} color="warning.main">
          {points} points
        </Typography>
      </Stack>
      <Button
        variant="contained"
        color="success"
        onClick={async () => {
          await generateProof();
        }}
      >
        Claim
      </Button>
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Typography variant="h5">Reward</Typography>
        <Typography fontSize={20} color="warning.main">
          {rewards} {currency}
        </Typography>
      </Stack>
    </Box>
  );
};

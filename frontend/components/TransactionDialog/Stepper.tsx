import { Box, Stepper as MUIStepper, Step, StepLabel } from '@mui/material';

const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad'
];

type StepperProps = {
  activeStep: number;
};

export const Stepper: React.FC<StepperProps> = ({ activeStep }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <MUIStepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </MUIStepper>
    </Box>
  );
};

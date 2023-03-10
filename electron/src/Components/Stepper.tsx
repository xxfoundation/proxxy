import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Stepper, Step } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel, { stepLabelClasses } from '@mui/material/StepLabel';

const CustomizedConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.primary.main,
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const CustomizedLabel = styled(StepLabel)(({ theme }) => ({
  [`& .${stepLabelClasses.labelContainer}`]: {
    [`& .${stepLabelClasses.active}`]: {
      color: theme.palette.text.primary,
      fontWeight: 'bold'
    },
    [`& .${stepLabelClasses.completed}`]: {
      color: theme.palette.text.secondary,
    },
  }
}));

interface Props {
  steps: string[],
  activeStep: number
}

export default function CustomizedSteppers ({ steps, activeStep }: Props): React.ReactElement {
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<CustomizedConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <CustomizedLabel>{label}</CustomizedLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
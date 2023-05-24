import * as React from 'react'
import { styled } from '@mui/material/styles'
import { Stepper, Step } from '@mui/material'
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector'
import StepLabel, { stepLabelClasses } from '@mui/material/StepLabel'

const CustomizedConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 12,
    left: 'calc(-50% + 19px)',
    right: 'calc(50% + 19px)',
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.primary.main,
    borderTopWidth: 3.6,
    borderRadius: 1.2,
  },
}))

const CustomizedLabel = styled(StepLabel)(({ theme }) => ({
  [`& .${stepLabelClasses.labelContainer}`]: {
    [`& .${stepLabelClasses.active}`]: {
      color: theme.palette.text.primary,
      fontWeight: 'bold',
    },
    [`& .${stepLabelClasses.completed}`]: {
      color: theme.palette.text.secondary,
    },
  },
}))

interface Props {
  steps: string[]
  activeStep: number
}

export default function CustomizedSteppers({
  steps,
  activeStep,
}: Props): React.ReactElement {
  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<CustomizedConnector />}
    >
      {steps.map((label) => (
        <Step key={label} sx={{ width: '120px' }}>
          <CustomizedLabel>{label}</CustomizedLabel>
        </Step>
      ))}
    </Stepper>
  )
}

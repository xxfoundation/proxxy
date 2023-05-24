import { Stack } from '@mui/material'
import CustomizedSteppers from './Stepper'
import { useCallback, useState } from 'react'
import { StepContent } from './StepContent'

declare global {
  var astilectron: any
}

export const Hello = () => {
  const steps = [
    'Download Proxxy App',
    'Connect Proxxy',
    'Connect Wallet',
    'Select Network',
  ]
  const [step, setStep] = useState<number>(0)

  const next = useCallback(() => {
    setStep((v) => Math.min(steps.length, v + 1))
  }, [])

  const back = useCallback((step?: number) => {
    setStep((v) => {
      if (step !== undefined) {
        return step
      }
      const prev = Math.max(0, v - 1)
      return prev
    })
  }, [])

  return (
    <Stack alignItems={'center'} spacing={4}>
      <CustomizedSteppers steps={steps} activeStep={step} />
      <StepContent
        step={step}
        maxSteps={steps.length}
        next={next}
        back={back}
      />
    </Stack>
  )
}

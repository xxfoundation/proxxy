import { Button, Stack, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { CheckCmixConnection, Connection } from '../Steps/CheckCmixConnection'
import { ConnectWallet } from '../Steps/ConnectWallet'
import { ConnectNetworks } from '../Steps/ConnectNetworks'
import { theme } from '../theme'
import { DownloadApp } from './DownloadApp'

interface Props {
  step: number
  maxSteps: number
  next: () => void
  back: () => void
}

const nextButtonDisable = (
  step: number,
  connecting: Connection,
  walletConnected: boolean,
): boolean => {
  console.log(connecting !== 'on')
  return (step > 1 && !walletConnected) || (step > 0 && connecting !== 'on')
}

const nextButtonDisplay = (step: number): boolean => {
  return step >= 0 && step < 3
}

export const StepContent = ({ step, maxSteps, next, back }: Props) => {
  const [connecting, setConnecting] = useState<Connection>('off')
  const [walletConnected, setWalletConnected] = useState(false)

  const restart = useCallback(() => {
    if (step === 2) {
      setConnecting('off')
    }
    if (step >= 2) {
      setWalletConnected(false)
    }
    back()
  }, [step, back, setConnecting])

  return (
    <Stack alignItems={'center'} spacing={3}>
      {step === 0 && (
        <DownloadApp title={'cMix Proxxy Electron App'} label={'Download'} />
      )}
      {step === 1 && (
        <CheckCmixConnection
          next={next}
          connecting={connecting}
          setConnecting={setConnecting}
        />
      )}
      {step === 2 && <ConnectWallet setWalletConnected={setWalletConnected} />}
      {step >= 3 && <ConnectNetworks next={next} />}
      <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
        <Button variant={'outlined'} onClick={restart} disabled={step === 0}>
          <Typography
            variant='body3'
            sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}
          >
            Back
          </Typography>
        </Button>
        {nextButtonDisplay(step) && (
          <Button
            variant={'contained'}
            onClick={next}
            disabled={
              step === maxSteps - 1 ||
              nextButtonDisable(step, connecting, walletConnected)
            }
          >
            <Typography
              variant='body3'
              sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}
            >
              Next
            </Typography>
          </Button>
        )}
      </Stack>
    </Stack>
  )
}

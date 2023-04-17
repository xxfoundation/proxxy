import { Button, Stack, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { CheckCmixConnection, Connection } from '../Steps/CheckCmixConnection'
import { ConnectWallet } from '../Steps/ConnectWallet'
import { SelectNetworks } from '../Steps/SelectNetworks'
import { theme } from '../theme'
import { DownloadApp } from '../Steps/DownloadApp'

interface Props {
  step: number
  maxSteps: number
  next: () => void
  back: (step?: number) => void
}

const nextButtonDisable = (
  step: number,
  connecting: Connection,
  walletConnected: boolean,
): boolean => {
  return (step > 1 && !walletConnected) || (step > 0 && connecting !== 'on')
}

const restartButtonDisplay = (step: number): boolean => {
  return step >= 4
}

export const StepContent = ({ step, maxSteps, next, back }: Props) => {
  const [connecting, setConnecting] = useState<Connection>('off')
  const [walletConnected, setWalletConnected] = useState(false)

  const goBack = useCallback(() => {
    if (step === 2) {
      setConnecting('off')
    }
    if (step >= 2) {
      setWalletConnected(false)
    }
    back()
  }, [step, back, setConnecting])

  const restart = useCallback(() => {
    setConnecting('off')
    setWalletConnected(false)
    back(0)
  }, [next, setConnecting, setWalletConnected])

  return (
    <Stack alignItems={'center'} spacing={4} width={'95%'} padding={2}>
      {step === 0 && <DownloadApp />}
      {step === 1 && (
        <CheckCmixConnection
          next={next}
          connecting={connecting}
          setConnecting={setConnecting}
        />
      )}
      {step === 2 && <ConnectWallet setWalletConnected={setWalletConnected} />}
      {step >= 3 && <SelectNetworks next={next} />}
      {!restartButtonDisplay(step) ? (
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          minWidth={'100%'}
        >
          <Button variant={'outlined'} onClick={goBack} disabled={step === 0}>
            <Typography
              variant='body3'
              sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}
            >
              Back
            </Typography>
          </Button>
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
        </Stack>
      ) : (
        <Stack direction={'row'} justifyContent={'center'} minWidth={'100%'}>
          <Button variant={'outlined'} onClick={restart} disabled={step === 0}>
            <Typography
              variant='body3'
              sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}
            >
              Restart
            </Typography>
          </Button>
        </Stack>
      )}
    </Stack>
  )
}

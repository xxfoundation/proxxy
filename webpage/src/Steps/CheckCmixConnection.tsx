import { Alert, Box, Stack, Typography } from '@mui/material'
import { useCallback } from 'react'
import Loading from '../Utils/loading'
import { theme } from '../theme'
import {
  checkPort,
  RoundedButtonContainer,
  SquaredButtonContainer,
} from '../Utils/utils'

export type Connection = 'off' | 'connecting' | 'on'

export const Connected = (
  <Alert variant='filled' sx={{ padding: '4px 10px', mb: 1 }}>
    <Typography variant='body4' fontWeight={700}>
      Proxxy Connected!
    </Typography>
  </Alert>
)

const connectCmixInfo = `Open the Proxxy app and connect to cMix. Use the button below to verify Proxxy is active, and then click Next to proceed.`

interface Props {
  next: () => void
  connecting: Connection
  setConnecting: (connecting: Connection) => void
}
export const CheckCmixConnection = ({
  next,
  connecting,
  setConnecting,
}: Props) => {
  const connect = useCallback(() => {
    setConnecting('connecting')
    setTimeout(() => {
      checkPort()
        .then((res) => {
          if (res) {
            setConnecting('on')
            next()
          } else {
            setConnecting('off')
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }, 1000)
  }, [setConnecting])

  return (
    <Stack alignItems={'center'} sx={{ m: 5 }}>
      {connecting === 'off' ? (
        <Stack alignItems={'center'} sx={{ width: '350px' }} spacing={4}>
          <Typography
            variant='body3'
            sx={{ textAlign: 'justify', color: 'white' }}
          >
            {connectCmixInfo}
          </Typography>
          <Box>
            <SquaredButtonContainer label={'Verify Connection'} callback={connect} />
          </Box>
        </Stack>
      ) : connecting === 'connecting' ? (
        <Stack alignItems={'center'} spacing={2}>
          <Typography
            variant='body2'
            sx={{ color: theme.palette.text.primary }}
          >
            Verifying Proxxy connection...
          </Typography>
          <Loading size='md' />
        </Stack>
      ) : null}
    </Stack>
  )
}

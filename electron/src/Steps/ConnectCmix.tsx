import {
  Alert,
  AlertTitle,
  Button,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import { useCallback, useState } from 'react'
import Loading from '../Utils/loading'
import { theme } from '../theme'

declare global {
  var astilectron: any
}

type Connection = 'off' | 'connecting' | 'on'
interface Response {
  name: string
  payload: any
}

const RoundedButton = styled(Button)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  boxShadow: `0px 0px 15px ${theme.palette.primary.main}`,
  borderRadius: '50%',
  height: '90px',
  width: '90px',
  background: 'none',
  alignContent: 'center',
  [`&:hover`]: {
    backgroundColor: theme.palette.primary.main + '30',
    border: `2px solid ${theme.palette.primary.main}`,
  },
}))

interface PropsConnection {
  connection: Connection
}

const connectToCmix = ({ connection }: PropsConnection) => (
  <>
    {connection === 'on' ? (
      <Alert
        severity='success'
        variant='filled'
        sx={{ padding: '4px 10px', mb: 1 }}
      >
        <Typography variant='body4' fontWeight={700}>
          Connected to cMix!
        </Typography>
      </Alert>
    ) : (
      <Alert
        severity='info'
        variant='filled'
        icon={false}
        sx={{ paddingLeft: '2em', textAlign: 'left' }}
      >
        <AlertTitle sx={{ mb: 1, fontWeight: 'bold', textAlign: 'center' }}>
          Welcome to Proxxy
        </AlertTitle>
        <Typography variant='body4' fontWeight={700}>
          This app will protect your privacy while transacting with supported blockchain networks. <br />
          Press the Start button to connect to the cMix network and begin using Proxxy.
        </Typography>
      </Alert>
    )}
  </>
)

export const ConnectCmix = () => {
  const [connecting, setConnecting] = useState<Connection>('off')

  const connect = useCallback(() => {
    setConnecting('connecting')
    process.env.NODE_ENV !== 'production'
      ? setTimeout(() => {
          setConnecting('on')
        }, 1000)
      : global.astilectron.sendMessage(
          { name: 'connect' },
          (resp: any) => {
            setConnecting('on')
          }
        )
  }, [setConnecting])

  const disconnect = useCallback(() => {
    process.env.NODE_ENV !== 'production'
      ? setTimeout(() => {
          setConnecting('off')
        }, 1000)
      : global.astilectron.sendMessage(
          { name: 'disconnect' },
          () => {
            setConnecting('off')
          }
        )
  }, [setConnecting])

  return (
    <Stack alignItems={'center'}>
      {connecting === 'off' ? (
        <Stack alignItems={'center'} spacing={4}>
          {connectToCmix({ connection: connecting })}
          <RoundedButton variant={'contained'} onClick={connect}>
            <Stack
              sx={{ alignItems: 'center' }}
              direction={'column'}
              spacing={1}
            >
              <Typography
                variant='body3'
                sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}
              >
                Start
              </Typography>
            </Stack>
          </RoundedButton>
        </Stack>
      ) : connecting === 'connecting' ? (
        <Stack alignItems={'center'} spacing={2}>
          <Typography
            variant='body2'
            sx={{ color: theme.palette.text.primary }}
          >
            Connecting to cMix...
          </Typography>
          <Loading size='md' />
        </Stack>
      ) : (
        <Stack alignItems={'center'} spacing={3}>
          {connectToCmix({ connection: connecting })}
          <Alert
            variant={'outlined'}
            severity={'info'}
            sx={{
              width: '80%',
              fontSize: '12px',
              textAlign: 'left',
              padding: '4px 8px',
              color: theme.palette.primary.contrastText,
            }}
          >
            Head to <b>proxxy.xx.network</b> to connect Proxxy to MetaMask and select a network
          </Alert>
          <RoundedButton variant={'contained'} onClick={disconnect}>
            <Stack
              sx={{ alignItems: 'center' }}
              direction={'column'}
              spacing={1}
            >
              <Typography
                variant='body3'
                sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}
              >
                Stop
              </Typography>
            </Stack>
          </RoundedButton>
        </Stack>
      )}
    </Stack>
  )
}

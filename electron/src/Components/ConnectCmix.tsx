import {
  Alert,
  AlertTitle,
  Box,
  Button,
  IconButton,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useCallback, useEffect, useState } from 'react'
import Loading from './loading'
import { theme } from '../theme'

declare global {
  var astilectron: any
}

type Connection = 'off' | 'connecting' | 'on' | 'disconnecting'
type ResetState = 'off' | 'resetting' | 'on'

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
          This app will protect your privacy while transacting with supported
          blockchain networks. <br />
          Press the Start button to connect to the cMix network and begin using
          Proxxy.
        </Typography>
      </Alert>
    )}
  </>
)

export const ConnectCmix = () => {
  const [connecting, setConnecting] = useState<Connection>('off')
  const [error, setError] = useState<string | null>(null)
  const [about, setAbout] = useState<boolean>(false)
  const [reset, setReset] = useState<ResetState>('off')

  useEffect(() => {
    global.astilectron.onMessage((message: Response) => {
      if (message.name === 'resetting') {
        if (connecting !== 'off') {
          setConnecting('disconnecting')
        }
        setReset('resetting')
      }
      if (message.name === 'reset') {
        setConnecting('off')
        setReset('on')
      }
      if (message.name === 'about') {
        setAbout(true)
      }
    })
  }, [])

  const connect = useCallback(() => {
    setConnecting('connecting')
    global.astilectron.sendMessage({ name: 'connect' }, (resp: any) => {
      if (resp.name === 'error') {
        setError(resp.payload as string)
        setConnecting('off')
        return
      }
      setConnecting('on')
      setError(null)
    })
  }, [setConnecting])

  const disconnect = useCallback(() => {
    setConnecting('disconnecting')
    global.astilectron.sendMessage({ name: 'disconnect' }, () => {
      setConnecting('off')
    })
  }, [setConnecting])

  const handleClose = useCallback(() => {
    setAbout(false)
  }, [])

  const handleResetDone = useCallback(() => {
    setReset('off')
  }, [])

  return (
    <Stack alignItems={'center'}>
      {about && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '350px',
            border: '2px solid #00A2D6',
            bgcolor: 'black',
            borderRadius: 2,
            boxShadow: 24,
            padding: '1.25em 1.75em 1.5em',
            zIndex: 100,
          }}
        >
          <Stack direction='row' justifyContent='space-between'>
            <Typography
              variant='h5'
              component='h2'
              sx={{ alignSelf: 'center', color: theme.palette.primary.main }}
            >
              About Proxxy App
            </Typography>
            <IconButton
              size={'small'}
              onClick={handleClose}
              sx={{ margin: 0, padding: 0 }}
            >
              <CloseIcon sx={{ color: '#00A2D6' }} />
            </IconButton>
          </Stack>
          <Typography sx={{ mt: 2 }}>Visit <b>xxnetwork.wiki/Proxxy</b> to learn more.</Typography>
        </Box>
      )}
      {reset !== 'off' ?
        (reset === 'resetting' ?
          (
            <Stack alignItems={'center'} spacing={2}>
              <Typography
                variant='body2'
                sx={{ color: theme.palette.text.primary }}
              >
                App Resetting...
              </Typography>
              <Loading size='md' />
            </Stack>
          )
          :
          (
            <Stack alignItems={'center'} spacing={4}>
              <Alert
                severity='success'
                variant='filled'
                sx={{ padding: '4px 10px', mb: 1 }}
              >
                <Typography variant='body4' fontWeight={700}>
                  Reset complete!
                </Typography>
              </Alert>
              <RoundedButton variant={'contained'} onClick={handleResetDone}>
                <Stack
                  sx={{ alignItems: 'center' }}
                  direction={'column'}
                  spacing={1}
                >
                  <Typography
                    variant='body3'
                    sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}
                  >
                    Done
                  </Typography>
                </Stack>
              </RoundedButton>
            </Stack>
          )
        )
        :
        (
          connecting === 'off' ?
          (
            <Stack alignItems={'center'} spacing={4}>
              {error && (
                <Alert variant={'outlined'} severity={'error'}>
                  {error}
                </Alert>
              )}
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
          ) : connecting === 'disconnecting' ?
          (
            <Stack alignItems={'center'} spacing={2}>
              <Typography
                variant='body2'
                sx={{ color: theme.palette.text.primary }}
              >
                Disconnecting from cMix...
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
                Head to <b>proxxy.xx.network</b> to connect Proxxy to MetaMask and
                select a network
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
          )
        )
      }
    </Stack>
  )
}

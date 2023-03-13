import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import { useCallback, useState } from 'react'
import Loading from '../Utils/loading'
import useInput from '../hooks/useInput'
import { theme } from '../theme'
import { Networks } from './Networks'

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
  boxShadow: `0px 0px 7px ${theme.palette.primary.main}`,
  borderRadius: '50%',
  background: 'none',
  alignContent: 'center',
  aspectRatio: '1/1',
  [`&:hover`]: {
    backgroundColor: theme.palette.primary.main + '30',
    border: `2px solid ${theme.palette.primary.main}`,
  },
}))

interface Props {
  back: () => void
  next: () => void
}

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
          Connected to cmix network!
        </Typography>
      </Alert>
    ) : (
      <Alert
        severity='info'
        variant='filled'
        sx={{ padding: '4px 10px', mb: 1 }}
      >
        <Typography variant='body4' fontWeight={700}>
          Connect to cmix
        </Typography>
      </Alert>
    )}
  </>
)

export const ConnectCmix = ({ back, next }: Props) => {
  const [password, setPassword, setPasswordValue] = useInput('')
  const [connecting, setConnecting] = useState<Connection>('off')
  const [networks, setNetworks] = useState<string[]>([])

  const connect = useCallback(() => {
    setConnecting('connecting')
    process.env.NODE_ENV !== 'production'
      ? setTimeout(() => {
          setNetworks(['ethereum', 'polygon'])
          setConnecting('on')
          next()
        }, 1000)
      : global.astilectron.sendMessage(
          { name: 'connect', payload: password },
          (resp: Response) => {
            setNetworks(resp.payload as string[])
            setConnecting('on')
            next()
          },
        )
  }, [setConnecting, setNetworks])

  const disconnect = useCallback(() => {
    process.env.NODE_ENV !== 'production'
      ? setTimeout(() => {
          setPasswordValue('')
          setConnecting('off')
          back()
        }, 1000)
      : global.astilectron.sendMessage({ name: 'disconnect' }, () => {
          setPasswordValue('')
          setConnecting('off')
          back()
        })
  }, [setConnecting, setNetworks, setPasswordValue])

  return (
    <Stack alignItems={'center'}>
      {connecting === 'off' ? (
        <Stack alignItems={'center'} spacing={4}>
          {connectToCmix({ connection: connecting })}
          <Box>
            <TextField
              type='password'
              label='Password'
              size='small'
              value={password}
              onChange={setPassword}
            />
          </Box>
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
            variant='body3'
            sx={{ color: theme.palette.text.primary }}
          >
            Connecting to cMix
          </Typography>
          <Loading size='md' />
        </Stack>
      ) : (
        <Stack alignItems={'center'} spacing={3}>
          {connectToCmix({ connection: connecting })}
          <Networks networks={networks} />
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

import {
  Alert,
  AlertTitle,
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
          Connected to cmix network!
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
          This app will solely connect you to the cmix network. <br />
          It will open an HTTP proxy server in your computer which will allow
          you to connect to other blockchain networks through cmix.
        </Typography>
      </Alert>
    )}
  </>
)

export const ConnectCmix = () => {
  const [password, setPassword, setPasswordValue] = useInput('')
  const [connecting, setConnecting] = useState<Connection>('off')
  const [networks, setNetworks] = useState<string[]>([])

  const connect = useCallback(() => {
    setConnecting('connecting')
    process.env.NODE_ENV !== 'production'
      ? setTimeout(() => {
          setNetworks(['ethereum', 'polygon'])
          setConnecting('on')
        }, 1000)
      : global.astilectron.sendMessage(
          { name: 'connect', payload: password },
          (resp: Response) => {
            setNetworks(resp.payload as string[])
            setConnecting('on')
          },
        )
  }, [setConnecting, setNetworks])

  const disconnect = useCallback(() => {
    process.env.NODE_ENV !== 'production'
      ? setTimeout(() => {
          setPasswordValue('')
          setConnecting('off')
        }, 1000)
      : global.astilectron.sendMessage({ name: 'disconnect' }, () => {
          setPasswordValue('')
          setConnecting('off')
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
            variant='body2'
            sx={{ color: theme.palette.text.primary }}
          >
            Connecting to cmix network...
          </Typography>
          <Loading size='md' />
        </Stack>
      ) : (
        <Stack alignItems={'center'} spacing={3}>
          {connectToCmix({ connection: connecting })}
          {/* <Networks networks={networks} /> */}
          <Alert
            variant={'outlined'}
            severity={'info'}
            sx={{
              fontSize: '12px',
              textAlign: 'left',
              padding: '4px 8px',
              color: theme.palette.primary.contrastText,
            }}
          >
            Go back to{' '}
            <i>
              <b>Proxxy Webpage</b>
            </i>{' '}
            to connect to a different network through cmix. <br />
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

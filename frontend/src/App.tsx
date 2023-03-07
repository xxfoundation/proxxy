import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box, Stack, Button, TextField, Typography, styled } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import icon from '../assets/icon.svg';
import { useCallback, useState } from 'react';
import useInput from './hooks/useInput';
import './App.css';
import Loading from './loading';
import { StopCircle } from '@mui/icons-material';

declare global {
  var astilectron: any
}

const RoundedButton = styled(Button)(({}) => {
  return {
    borderRadius: '30px',
    color: 'black',
    background: '#00A2D6',
    alignContent: 'center'
  };
});

type Connection = 'off' | 'connecting' | 'on';

interface Response {
  name: string
  payload: any
}

function Hello() {
  const [password, setPassword, setPasswordValue] = useInput('');
  const [connecting, setConnecting] = useState<Connection>('off');
  const [networks, setNetworks] = useState<string[]>([]);
  console.log(window);
  const connect = useCallback(
    () => {
      setConnecting('connecting');
      global.astilectron.sendMessage({name: 'connect', payload: password}, (resp: Response) => {
        setNetworks(resp.payload as string[]);
        setConnecting('on');
      });
    },
  [setConnecting, setNetworks]);

  const disconnect = useCallback(
    () => {
      global.astilectron.sendMessage({name: 'disconnect'}, () => {
        setPasswordValue('');
        setConnecting('off');
      });
    },
  [setConnecting, setNetworks, setPasswordValue]);

  return (
    <Container>
      <Stack alignItems={"center"}>
        <Box paddingTop={2} paddingBottom={4}><img width="200" alt="icon" src={icon}/></Box>
        { connecting === 'off' ? (
            <Stack alignItems={"center"} spacing={2}>
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
                <Stack direction={"row"} spacing={1}>
                  <Typography variant='h6'>Start Proxy</Typography>
                  <PlayCircleIcon fontSize={'large'}/>
                </Stack>
              </RoundedButton>
            </Stack>
        ): connecting === 'connecting' ?
          <Stack alignItems={"center"} spacing={2}>
            <Typography variant='h6'>Connecting to cMix</Typography>
            <Loading size='md'/>
          </Stack>
          :
            <Stack alignItems={"center"} spacing={1}>
              <Typography>Connected!</Typography>
              <Typography>Supported Networks:</Typography>
              {networks.map((network) => <Typography>{network}</Typography>)}
              <RoundedButton variant={'contained'} onClick={disconnect}>
              <Stack direction={"row"} spacing={1}>
                <Typography variant='h6'>Disconnect</Typography>
                <StopCircle fontSize={'large'}/>
              </Stack>
              </RoundedButton>
            </Stack>
        }
      </Stack>
    </Container>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}

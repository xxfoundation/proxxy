
import { Alert, Box, Button, Stack, styled, TextField, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import Loading from "../Utils/loading";
import { theme } from "../theme";
import { checkPort } from "../Utils/utils";
import { Networks } from "./Networks";
import { ConnectMetamask } from "../Components/ConnectMetamask";

type Connection = 'off' | 'connecting' | 'on';

const networks = [
  {
    'name': 'Mainnet',
    'chainId': 1,
    'rpc': 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    'explorer': 'https://etherscan.io',
    'icon': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png'
  },
  {
    'name': 'Ropsten',
    'chainId': 3,
    'rpc': 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    'explorer': 'https://ropsten.etherscan.io',
    'icon': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png'
  },
  {
    'name': 'Goerli',
    'chainId': 5,
    'rpc': 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    'explorer': 'https://goerli.etherscan.io',
    'icon': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png'
  },
]

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
  }
}));

interface Props {
  back: () => void;
  next: () => void;
}

const connected = (
  <Alert variant='filled' sx={{ padding: '4px 10px', mb: 1 }}>
    <Typography variant='body4' fontWeight={700}>
      Connected to cmix network!
    </Typography>
  </Alert>
);

export const CheckCmixConnection = ({ back, next }: Props) => {
  const [connecting, setConnecting] = useState<Connection>('off');
  const [account, setAccount] = useState<string>('');

    const connect = useCallback(
        () => {
          setConnecting('connecting');
          checkPort().then((res) => {
            if (res) {
              setConnecting('on');
              next();
            } else {
              setConnecting('off');
            }
          }).catch((e) => {
            console.log(e);
          });
        },
    [setConnecting]);

    const restart = useCallback(
      () => {
        setConnecting('off');
        back();
      },
    [setConnecting]);
    
    return (
        <Stack alignItems={"center"} sx ={{ m: 5 }}>
          { connecting === 'off' ? (
              <Stack alignItems={"center"} spacing={4}>
                <RoundedButton variant={'contained'} onClick={connect}>
                  <Stack sx={{ alignItems: 'center' }} direction={"column"} spacing={1}>
                    <Typography variant='body3' sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Check</Typography>
                  </Stack>
                </RoundedButton>
              </Stack>
          ): connecting === 'connecting' ?
            <Stack alignItems={"center"} spacing={2}>
              <Typography variant='body3' sx={{ color: theme.palette.text.primary }}>Checking cMix connection...</Typography>
              <Loading size='md'/>
            </Stack>
            :
            <Stack alignItems={"center"} spacing={3}>
              {connected}
              <Networks networks={{ ...networks }}/>
              {!account.length ? <ConnectMetamask next={next} setAccount={setAccount} />
              : 
              <Stack alignItems={"center"} spacing={0}>
                <Typography variant='body3' sx={{ color: theme.palette.text.primary }}>Wallet Connected!</Typography>
                <Typography variant='body4' sx={{ fontFamily: 'monospace',  }}>{account}</Typography>
              </Stack>}
              <RoundedButton variant={'contained'} onClick={restart}>
                <Stack sx={{ alignItems: 'center' }} direction={"column"} spacing={1}>
                  <Typography variant='body3' sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Restart</Typography>
                </Stack>
              </RoundedButton>
            </Stack>
          }
        </Stack>
    );
}
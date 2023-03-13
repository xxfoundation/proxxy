import { Box, Button, Container, Stack, Typography } from "@mui/material";
import icon from '../assets/icon.svg';
import CustomizedSteppers from "./Stepper";
import { CheckCmixConnection, Connected, Connection } from "../Steps/CheckCmixConnection";
import { useCallback, useState } from "react";
import ExpandItem from "./ExpandItem";
import { ConnectWallet } from "../Steps/ConnectWallet";
import { StepContent } from "./StepContent";
import { theme } from "../theme";

declare global {
  var astilectron: any
}

const thread = (
  <Typography variant='body4' textAlign='justify'>
    Anytime a user interacts with a blockchain using a website or mobile wallet connecting to anything other than the RPC endpoint of a personally operated full node, it is leaking data that can be gathered. Not that it is, but it can be. This lack of privacy has been know and acknowledged for a long time <a href='https://www.coindesk.com/markets/2018/11/08/the-little-known-ways-ethereum-reveals-user-location-data/'>(Coindesk) </a>
    and remains one to this day with RPC providers - <a href='https://support.metamask.io/hc/en-us/articles/10992445334555-Does-MetaMask-collect-my-personal-data-'>'MetaMask must have an RPC provider to work, and an RPC provider must collect your IP and wallet address to work.'</a>
    <br />
    <br />
    When one connects to a public RPC endpoint, of any blockchain, the owner of that endpoint can see all the traffic coming and going. Metadata such as IP can be used to determine location, date & time can be used to find routines, and often more, such as tracking data from a browser that can be used to create social graphs, user profiles and personal information, etc <a href='https://edu.gcfglobal.org/en/internetsafety/understanding-browser-tracking/1/# '>(Understanding browser tracking)</a>.
    <br />
    <br />
    With cMix Proxxy, we show one can use a public RPC endpoint, and metadata and/or browser data does not end up in the possession of an RPC endpoint provider.
  </Typography>
);

export const Hello = () => {
  const steps = ['Check if running local Proxxy App', 'Connect to Wallet', 'Connect to Network'];
  const [step, setStep] = useState(0);
  const [connecting, setConnecting] = useState<Connection>('off');
  const [walletConnected, setWalletConnected] = useState(false);

  const next = useCallback(() => {
    setStep((v) => Math.min(steps.length - 1, v + 1));
  }, []);

  const back = useCallback(() => {
    setStep((v) => {
      const prev = Math.max(0, v - 1);
      return prev;
    });
  }, []);

  const restart = useCallback(
    () => {
      setConnecting('off');
      setStep((v) => 0);
    },
  [setConnecting]);

  return (
    <Container sx={{
      maxWidth: '600px',
      maxHeight: '800px',
      overflowY: 'auto'
    }}>
      <Stack alignItems={"center"} spacing={4}>
        <Box><img width="200" alt="icon" src={icon}/></Box>
        <CustomizedSteppers steps={steps} activeStep={step} />
        {connecting === 'on' ?
          <Stack alignItems={"center"} spacing={3}>
            <StepContent step={step} setWalletConnected={setWalletConnected} next={next}/>
            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
              <Button variant={'outlined'} onClick={restart} disabled={step === 0}>
                <Typography variant='body3' sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Restart</Typography>
              </Button>
              <Button variant={'contained'} onClick={next} disabled={step === steps.length - 1 || !walletConnected}>
                <Typography variant='body3' sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Next</Typography>
              </Button>
            </Stack>
          </Stack>
          : <CheckCmixConnection back={back} next={next} connecting={connecting} setConnecting={setConnecting}/> 
        }
        <Stack sx={{ maxWidth: '400px' }}>
          <ExpandItem title={'More Information'} children={thread}/>
        </Stack>
      </Stack>
    </Container>
  );
}
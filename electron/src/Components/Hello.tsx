import { Alert, Box, Button, Container, Stack, styled, Typography } from "@mui/material";
import icon from '../assets/icon.svg';
import useToggle from "../hooks/useToggle";
import CustomizedSteppers from "./Stepper";
import { theme } from "../theme";
import { ConnectCmix } from "../Steps/ConnectCmix";
import { useCallback, useState } from "react";
import ExpandItem from "./ExpandItem";

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
  const steps = ['Connect to cMix', 'Select Networks'];
  const [expandInformation, information] = useToggle();
  const [step, setStep] = useState(0);

  const next = useCallback(() => {
    setStep((v) => Math.min(steps.length - 1, v + 1));
  }, []);

  const back = useCallback(() => {
    setStep((v) => {
      const prev = Math.max(0, v - 1);
      return prev;
    });
  }, []);

  return (
    <Container sx={{ 
      width: '350px',
      maxWidth: '400px',
      maxHeight: '800px',
      overflowY: 'auto'
    }}>
      <Stack alignItems={"center"}>
        <Box paddingTop={2} paddingBottom={4}><img width="200" alt="icon" src={icon}/></Box>
        <CustomizedSteppers steps={steps} activeStep={step} />
        <ConnectCmix back={back} next={next} />
      </Stack>
      <Stack sx={{ maxWidth: '400px' }}>
        <ExpandItem title={'More Information'} children={thread}/>
      </Stack>
    </Container>
  );
}
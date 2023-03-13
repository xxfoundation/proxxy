
import { Alert, Button, Stack, styled, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import Loading from "../Utils/loading";
import { theme } from "../theme";
import { checkPort } from "../Utils/utils";

export type Connection = 'off' | 'connecting' | 'on';

export const Connected = (
  <Alert variant='filled' sx={{ padding: '4px 10px', mb: 1 }}>
    <Typography variant='body4' fontWeight={700}>
      Connected to cmix network!
    </Typography>
  </Alert>
);

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

const RoundedButtonContainer = (label: string, callback: () => void) => (
  <RoundedButton variant={'contained'} onClick={callback}>
    <Stack sx={{ alignItems: 'center' }} direction={"column"} spacing={1}>
      <Typography variant='body3' sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>{label}</Typography>
    </Stack>
  </RoundedButton>
)

interface Props {
  back: () => void;
  next: () => void;
  connecting: Connection;
  setConnecting: (connecting: Connection) => void;
}
export const CheckCmixConnection = ({ back, next, connecting, setConnecting }: Props) => {
    const connect = useCallback(
        () => {
          setConnecting('connecting');
          setTimeout(() => {
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
          }, 1000);
        },
    [setConnecting]);
    
    return (
        <Stack alignItems={"center"} sx ={{ m: 5 }}>
          { connecting === 'off' ? (
              <Stack alignItems={"center"} spacing={4}>
                {RoundedButtonContainer('Check', connect)}
              </Stack>
          ): connecting === 'connecting' ?
            <Stack alignItems={"center"} spacing={2}>
              <Typography variant='body2' sx={{ color: theme.palette.text.primary }}>Checking cMix connection...</Typography>
              <Loading size='md'/>
            </Stack>
            : null
          }
        </Stack>
    );
}
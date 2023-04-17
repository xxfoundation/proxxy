import { Box, Container, Stack, Typography } from '@mui/material'
import icon from '../assets/icon.svg'
import CustomizedSteppers from './Stepper'
import { ConnectCmix } from '../Steps/ConnectCmix'
import { useCallback, useState } from 'react'
import ExpandItem from './ExpandItem'

declare global {
  var astilectron: any
}

const thread = (
  <Typography variant='body4' textAlign='justify'>
    Anytime a user interacts with a blockchain using a website or mobile wallet
    connecting to anything other than the RPC endpoint of a personally operated
    full node, it is leaking data that can be gathered. Not that it is, but it
    can be. This lack of privacy has been know and acknowledged for a long time
    and remains one to this day with RPC providers - 'MetaMask must have an RPC
    provider to work, and an RPC provider must collect your IP and wallet
    address to work.'
    <br />
    <br />
    When one connects to a public RPC endpoint, of any blockchain, the owner of
    that endpoint can see all the traffic coming and going. Metadata such as IP
    can be used to determine location, date & time can be used to find routines,
    and often more, such as tracking data from a browser that can be used to
    create social graphs, user profiles and personal information, etc.
    <br />
    <br />
    With cMix Proxxy, we show one can use a public RPC endpoint, and metadata
    and/or browser data does not end up in the possession of an RPC endpoint
    provider.
  </Typography>
)

export const Hello = () => {
  return (
    <Container
      sx={{
        width: '400px',
        maxWidth: '450px',
        maxHeight: '800px',
        overflowY: 'auto',
      }}
    >
      <Stack alignItems={'center'} spacing={4}>
        <Box paddingTop={1}>
          <img width='200' alt='icon' src={icon} />
        </Box>
        <ConnectCmix />
        <Stack sx={{ maxWidth: '400px' }}>
          <ExpandItem title={'More Information'} children={thread} />
        </Stack>
      </Stack>
    </Container>
  )
}

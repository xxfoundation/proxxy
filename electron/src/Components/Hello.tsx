import { Box, Container, Stack } from '@mui/material'
import { ConnectCmix } from './ConnectCmix'
import proxxy_logo from '../assets/proxxy_logo.png'
import madeBy from '../assets/madeBy.png'

declare global {
  var astilectron: any
}

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
      <Stack alignItems={'center'} spacing={4} paddingBottom={4}>
        <Box paddingTop={1}>
          <img width='200' alt='logo' src={proxxy_logo} />
        </Box>
        <ConnectCmix />
        <Box>
          <img width='200' alt='madeBy' src={madeBy} />
        </Box>
      </Stack>
    </Container>
  )
}

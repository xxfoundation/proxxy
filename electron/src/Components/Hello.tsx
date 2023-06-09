import { Box, Container, Stack } from '@mui/material'
import icon from '../assets/icon.svg'
import { ConnectCmix } from './ConnectCmix'

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
          <img width='200' alt='icon' src={icon} />
        </Box>
        <ConnectCmix />
      </Stack>
    </Container>
  )
}

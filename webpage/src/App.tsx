import { Box, Container, Stack, Typography } from '@mui/material'
import './App.css'
import { Hello } from './Components/Hello'
// import icon from './assets/icon.svg'
import logo from './assets/whiteLogo.png'
import madeBy from './assets/madeBy.png'

function App() {
  return (
    <div className='App'>
      <Container
        sx={{
          maxWidth: '800px',
          maxHeight: '1600px',
        }}
      >
        <Stack mb={'1.5em'} direction={'row'} sx={{ justifyContent: 'center' }}>
            <Box margin={1}>
            <img width='50' alt='logo' src={logo} />
          </Box>
          <Typography variant='h2' sx={{ paddingBottom: '0.35em', alignSelf: 'center' }}>proxxy</Typography>
        </Stack>
        <Hello />
        <Box>
          <img width='200' alt='madeBy' src={madeBy} />
        </Box>
      </Container>
    </div>
  )
}

export default App

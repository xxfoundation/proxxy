import { Box, Container, Stack, Typography } from '@mui/material'
import './App.css'
import { Hello } from './Components/Hello'
import proxxy_logo from './assets/proxxy_logo.png'
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
        <Box margin={1}>
          <img width='200' alt='logo' src={proxxy_logo} />
        </Box>
        <Hello />
        <Box>
          <img width='200' alt='madeBy' src={madeBy} />
        </Box>
      </Container>
    </div>
  )
}

export default App

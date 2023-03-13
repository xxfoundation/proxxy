import { Box, Container } from '@mui/material'
import './App.css'
import { Hello } from './Components/Hello'
import icon from './assets/icon.svg'

function App() {
  return (
    <div className='App'>
      <Container
        sx={{
          maxWidth: '600px',
          maxHeight: '800px',
          overflowY: 'auto',
        }}
      >
        <Box margin={2}>
          <img width='200' alt='icon' src={icon} />
        </Box>
        <Hello />
      </Container>
    </div>
  )
}

export default App

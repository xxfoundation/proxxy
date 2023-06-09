import { Button, Stack, styled, Typography } from '@mui/material'
import { theme } from '../theme'

export type Network = {
  name: string
  chainId: number
  symbol: string
  rpc: string
  icon: string
}

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
  },
}))

export const RoundedButtonContainer = (label: string, callback: () => void) => (
  <RoundedButton variant={'contained'} onClick={callback}>
    <Stack sx={{ alignItems: 'center' }} direction={'column'} spacing={1}>
      <Typography
        variant='body3'
        sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}
      >
        {label}
      </Typography>
    </Stack>
  </RoundedButton>
)

const SquaredButton = styled(Button)(({ theme }) => ({
  border: `2.4px solid ${theme.palette.primary.main}`,
  boxShadow: `0px 0px 8.4px ${theme.palette.primary.main}`,
  borderRadius: '12px',
  background: 'none',
  alignContent: 'center',
  padding: '0.45rem 1.2rem',
  [`&:hover`]: {
    backgroundColor: theme.palette.primary.main + '30',
    border: `2.4px solid ${theme.palette.primary.main}`,
  },
}))

interface SquaredButtonProps {
  label: string
  callback: () => void
  disabled?: boolean
}

export const SquaredButtonContainer = ({
  label,
  callback,
  disabled = false,
}: SquaredButtonProps) => (
  <SquaredButton variant={'contained'} onClick={callback} disabled={disabled}>
    <Stack sx={{ alignItems: 'center' }} direction={'column'} spacing={1}>
      <Typography
        variant='body4'
        sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}
      >
        {label}
      </Typography>
    </Stack>
  </SquaredButton>
)

interface ButtonProps {
  label: string
  callback: () => void
  disabledLogic: boolean
}

export const StyledButton = ({
  label,
  callback,
  disabledLogic,
}: ButtonProps) => (
  <Button variant={'outlined'} onClick={callback} disabled={disabledLogic}>
    <Typography
      variant='body3'
      sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}
    >
      {label}
    </Typography>
  </Button>
)

const isHttpPortInUse = async (port: number): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:${port}`, {
      mode: 'no-cors',
    })
    console.log(response)
    return !!response
  } catch (error) {
    return false
  }
}

export const checkPort = async () => {
  const port = 9296 // replace with the port number you want to check
  const isPortInUse = await isHttpPortInUse(port)
  console.log(`HTTP port ${port} is ${isPortInUse ? 'in use' : 'not in use'}`)
  return isPortInUse
}

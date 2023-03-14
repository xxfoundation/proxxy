import { Alert, Link, Stack, Typography } from '@mui/material'
import { theme } from '../theme'

interface Props {
  networks: string[]
}

export const Networks = ({ networks }: Props) => {
  return (
    <Stack spacing={3}>
      <Stack sx={{ width: '220px', textAlign: 'left' }}>
        <Typography variant='h5' sx={{ color: theme.palette.primary.main }}>
          Supported Networks
        </Typography>
        {networks.map((network) => (
          <Typography key={network} variant='body2'>
            {network}
          </Typography>
        ))}
      </Stack>
    </Stack>
  )
}

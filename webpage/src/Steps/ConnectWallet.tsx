import { Alert, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { ConnectMetamask } from '../Components/ConnectMetamask'
import { Connected } from './CheckCmixConnection'

interface Props {
  setWalletConnected: (walletConnected: boolean) => void
}

export const ConnectWallet = ({ setWalletConnected }: Props) => {
  const [account, setAccount] = useState<string | undefined>(undefined)

  return (
    <Stack alignItems={'center'} spacing={3}>
      {Connected}
      {account === undefined ? (
        <ConnectMetamask
          setAccount={setAccount}
          setWalletConnected={setWalletConnected}
        />
      ) : (
        <Stack alignItems={'center'} spacing={1}>
          <Alert variant='filled' sx={{ padding: '5px 12px', mb: 1.2 }}>
            <Typography variant='body4' fontWeight={700}>
              Wallet Connected!
              <br />
            </Typography>
          </Alert>
        </Stack>
      )}
    </Stack>
  )
}

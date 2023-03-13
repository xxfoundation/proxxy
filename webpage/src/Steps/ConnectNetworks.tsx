import {
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { theme } from '../theme'
import { Network } from '../Utils/utils'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SyncIcon from '@mui/icons-material/Sync'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useCallback, useEffect, useState } from 'react'

const baseRPC = 'http://localhost:9296'
const baseNetworkName = '(Proxxy) '

const networks: Network[] = [
  {
    name: 'Ethereum Mainnet',
    chainId: 1,
    symbol: 'ETH',
    rpc: `${baseRPC}/ethereum/mainnet`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
  },
  {
    name: 'Goerli Testnet',
    chainId: 5,
    symbol: 'ETH',
    rpc: `${baseRPC}/ethereum/goerli`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
  },
]

const addCustomNetwork = async (network: Network) => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${network.chainId.toString(16)}` }],
    })
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${network.chainId.toString(16)}`,
              chainName: `${baseNetworkName}${network.name}`,
              nativeCurrency: {
                name: network.symbol,
                symbol: network.symbol,
                decimals: 18,
              },
              rpcUrls: [network.rpc],
            },
          ],
        })
      } catch (addError) {
        // handle "add" error
        console.error('Could not add network to MetaMask', addError)
      }
    }
    // handle other "switch" errors
    console.error('Could not switch to network in MetaMask', switchError)
  }
}

interface Props {
  next: () => void
}

export const ConnectNetworks = ({ next }: Props) => {
  const [networkAdded, setNetworkAdded] = useState<string | undefined>(
    undefined,
  )

  const addNetwork = useCallback(async (network: Network) => {
    try {
      await addCustomNetwork(network)
      setNetworkAdded(network.name)
    } catch (error) {
      console.error(`Error adding ${network.name} to MetaMask`, error)
      setNetworkAdded(undefined)
    }
  }, [])

  useEffect(() => {
    if (networkAdded !== undefined) {
      console.log('Network added: ', networkAdded)
      next()
    }
  }, [networkAdded])

  return (
    <Stack alignItems={'center'} sx={{ m: 4 }}>
      <Typography variant='h5' sx={{ color: theme.palette.primary.main }}>
        Supported Networks
      </Typography>
      {networks.length === 0 ? (
        <Typography variant='body2' sx={{ color: theme.palette.text.primary }}>
          No networks found
        </Typography>
      ) : (
        <Table sx={{ width: '300px' }} aria-label='Supported Networks Table'>
          <TableBody>
            {Object.values(networks).map((network: Network) => (
              <TableRow key={network.name}>
                <TableCell>
                  <Box>
                    <img width='30' alt='icon' src={network.icon} />
                  </Box>
                </TableCell>
                <TableCell>{network.name}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => addNetwork(network)}
                    disabled={networkAdded === network.name}
                  >
                    {networkAdded === network.name ? (
                      <CheckCircleIcon
                        sx={{
                          color: theme.palette.success.main,
                        }}
                      />
                    ) : (
                      <SyncIcon
                        sx={{
                          color: theme.palette.text.primary,
                        }}
                      />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Stack>
  )
}

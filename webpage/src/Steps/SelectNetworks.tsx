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
import SyncIcon from '@mui/icons-material/Sync'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useCallback, useEffect, useState } from 'react'

interface SpinningProps {
  flag: boolean
}

const SpinningSyncIcon = ({ flag }: SpinningProps) => {
  return (
    <>
      {flag ? (
        <SyncIcon
          sx={{
            animation: 'spin 2s linear infinite',
            '@keyframes spin': {
              '0%': {
                transform: 'rotate(360deg)',
              },
              '100%': {
                transform: 'rotate(0deg)',
              },
            },
          }}
        />
      ) : (
        <SyncIcon />
      )}
    </>
  )
}

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

const checkConnectedNetwork = async () => {
  const chainId = await window.ethereum.request({
    method: 'eth_chainId',
  })
  console.log(chainId)
  return networks.find((network) => network.chainId === parseInt(chainId))
}

interface Props {
  next: () => void
}

export const SelectNetworks = ({ next }: Props) => {
  const [networkAdded, setNetworkAdded] = useState<string | undefined>(
    undefined,
  )
  const [loadingNetwork, setLoadingNetwork] = useState<string | undefined>(
    undefined,
  )
  const addCustomNetwork = async (network: Network) => {
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
      console.error('Could not add network to MetaMask', addError)
    }
  }

  const addNetwork = useCallback(async (network: Network) => {
    try {
      setLoadingNetwork(network.name)
      const retval = await addCustomNetwork(network)
      setLoadingNetwork(undefined)
      retval === null
        ? setNetworkAdded(network.name)
        : setNetworkAdded(undefined)
    } catch (error) {
      console.error(`Error adding ${network.name} to MetaMask`, error)
      setNetworkAdded(undefined)
    }
  }, [])

  useEffect(() => {
    console.log(loadingNetwork)
    checkConnectedNetwork().then((network) => {
      console.log(network)
      if (network !== undefined) {
        setNetworkAdded(network.name)
      }
    })
    if (networkAdded !== undefined) {
      console.log('Network added: ', networkAdded)
      next()
    }
  }, [networkAdded, loadingNetwork])

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
                    sx={{ color: 'white' }}
                  >
                    {networkAdded === network.name ? (
                      <CheckCircleIcon
                        sx={{
                          color: theme.palette.success.main,
                        }}
                      />
                    ) : (
                      <SpinningSyncIcon
                        flag={loadingNetwork === network.name}
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

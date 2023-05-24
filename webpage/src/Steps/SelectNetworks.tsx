import {
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import { theme } from '../theme'
import { Network } from '../Utils/utils'
import { Networks, Testnets } from '../Utils/networks'
import SyncIcon from '@mui/icons-material/Sync'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useCallback, useState } from 'react'
import { ExpandItem } from '../Components/ExpandItem'
import useToggle from '../hooks/useToggle'

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

const baseNetworkName = '(Proxxy) '

const checkConnectedNetwork = async () => {
  const chainId = await window.ethereum.request({
    method: 'eth_chainId',
  })
  return Networks.concat(Testnets).find((network) => network.chainId === parseInt(chainId))
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

  const [networksExpanded, {toggle: toggleNetworks}] = useToggle(true)
  const [testnetsExpanded, {toggle: toggleTestnets}] = useToggle(false)

  const setNetworksExpanded = useCallback(() => {
    if (testnetsExpanded) {
      toggleTestnets()
    }
    toggleNetworks()
  }, [toggleNetworks, testnetsExpanded, toggleTestnets])

  const setTestnetsExpanded = useCallback(() => {
    if (networksExpanded) {
      toggleNetworks()
    }
    toggleTestnets()
  }, [toggleNetworks, networksExpanded, toggleTestnets])

  const addCustomNetwork = async (network: Network) => {
    return await window.ethereum.request({
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
  }

  const addNetwork = useCallback(async (network: Network) => {
    setLoadingNetwork(network.name)
    addCustomNetwork(network).then(() => {
      checkConnectedNetwork().then((network) => {
        if (network !== undefined) {
          setNetworkAdded(network.name)
          setLoadingNetwork(undefined)
          next()
        }
      })
    }).catch((error) => {
      console.error(`Error adding ${network.name} to MetaMask`, error)
      setLoadingNetwork(undefined)
      setNetworkAdded(undefined)
    })
  }, [])

  return (
    <Stack alignItems={'center'} sx={{ minWidth: '98%' }}>
      {Networks.length === 0 ? (
        <Typography variant='body2' sx={{ color: theme.palette.text.primary }}>
          No networks found
        </Typography>
      ) : (
          <Stack alignItems={'center'} spacing={2} sx={{ minWidth: 'inherit' }}>
            <ExpandItem title={'Supported Networks'} children={
              <TableContainer>
                <Table sx={{ overflowY: 'scroll' }} aria-label='Supported Networks Table'>
                  <TableBody>
                    {Object.values(Networks).map((network: Network) => (
                      <TableRow key={network.name}>
                        <TableCell width="15%">
                          <Box>
                            <img width='30' alt='icon' src={network.icon} />
                          </Box>
                        </TableCell>
                        <TableCell width="65%">{network.name}</TableCell>
                        <TableCell width="20%">
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
                </TableContainer>
              } expanded={networksExpanded} setExpanded={setNetworksExpanded}
            />
            <ExpandItem title={'Supported Testnets'} children={
              <TableContainer>
                <Table sx={{ overflowY: 'scroll' }} aria-label='Supported Testnets Table'>
                  <TableBody>
                    {Object.values(Testnets).map((network: Network) => (
                      <TableRow key={network.name}>
                        <TableCell width="15%">
                          <Box>
                            <img width='30' alt='icon' src={network.icon} />
                          </Box>
                        </TableCell>
                        <TableCell width="65%">{network.name}</TableCell>
                        <TableCell width="20%">
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
                </TableContainer>
             } expanded={testnetsExpanded} setExpanded={setTestnetsExpanded}
            />
        </Stack>
      )}
    </Stack>
  )
}

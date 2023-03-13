import { Alert, Button, Typography } from '@mui/material'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Web3 from 'web3'

interface Props {
  setAccount: (account: string | undefined) => void
  setWalletConnected: (walletConnected: boolean) => void
}

export const ConnectMetamask = ({ setAccount, setWalletConnected }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const [metamaskInstalled, setMetamaskInstalled] = useState<
    boolean | undefined
  >(undefined)
  useEffect(() => {
    const isMetamaskInstalled = () => {
      return (
        typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask
      )
    }
    setMetamaskInstalled(isMetamaskInstalled())
  }, [])

  const connectMetamask = useCallback(async () => {
    try {
      // Get the user's accounts from MetaMask
      setLoading(true)
      setError(undefined)
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      if (accounts !== undefined) {
        setLoading(false)
        setError(undefined)
        console.log(
          'Connected to MetaMask with account:',
          accounts && accounts[0],
        )
        setAccount(accounts[0])
        setWalletConnected(true)
      }
      // Perform any additional actions with the user's account
    } catch (error) {
      console.error('Error connecting to MetaMask', error)
      setError('Error connecting to MetaMask')
      setLoading(false)
    }
  }, [])

  return (
    <>
      {metamaskInstalled ? (
        <>
          <Button
            variant='contained'
            onClick={connectMetamask}
            disabled={loading}
          >
            <Typography
              variant='body3'
              sx={{ fontWeight: 'bold', color: 'white' }}
            >
              {loading ? 'Connecting to Metamask...' : 'Connect to MetaMask'}
            </Typography>
          </Button>
          {error !== undefined && (
            <Alert variant='filled' severity='error'>
              {' '}
              {error}{' '}
            </Alert>
          )}
        </>
      ) : metamaskInstalled === undefined ? null : (
        <Alert variant='filled' severity='error'>
          <Typography variant='body2' color={'white'}>
            Please install MetaMask to proceed
          </Typography>
        </Alert>
      )}
    </>
  )
}

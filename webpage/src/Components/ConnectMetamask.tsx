import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

interface Props {
  next: () => void;
  setAccount: (account: string) => void;
}

export const ConnectMetamask = ({next, setAccount}: Props) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      const newWeb3 = new Web3(window.ethereum);
      setWeb3(newWeb3);

      // Request permission to access user's MetaMask account
      window.ethereum.enable().catch((error: Error) => {
        console.error('User denied account access', error);
      });
    } else {
      console.error('Please install MetaMask to use this component');
    }
  }, []);

  const connectMetamask = async () => {
    try {
      // Get the user's accounts from MetaMask
      const accounts = await web3?.eth.getAccounts() || 'Weird error';
      console.log('Connected to MetaMask with account:', accounts && accounts[0]);
      setAccount(accounts[0]);
      next();
      // Perform any additional actions with the user's account
    } catch (error) {
      console.error('Error connecting to MetaMask', error);
    }
  };

  return (
    <button onClick={connectMetamask}>
      Connect with MetaMask
    </button>
  );
};
import { Network } from './utils';

const baseRPC = 'http://localhost:9296'

export const Networks: Network[] = [
  // Ethereum
  {
    name: 'Ethereum Mainnet',
    chainId: 1,
    symbol: 'ETH',
    rpc: `${baseRPC}/ethereum/mainnet`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
  },
  // Avalanche
  {
    name: 'Avalanche C-Chain',
    chainId: 43114,
    symbol: 'AVAX',
    rpc: `${baseRPC}/avalanche/mainnet/c`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchec/info/logo.png',
  },
  // Polygon
  {
    name: 'Polygon Mainnet',
    chainId: 137,
    symbol: 'MATIC',
    rpc: `${baseRPC}/polygon/mainnet`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png',
  },
  // Binance Smart Chain
  {
    name: 'Binance Smart Chain Mainnet',
    chainId: 56,
    symbol: 'BNB',
    rpc: `${baseRPC}/bnb/mainnet`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png',
  },
  // Astar
  {
    name: 'Astar',
    chainId: 592,
    symbol: 'ASTR',
    rpc: `${baseRPC}/astar/mainnet`,
    icon: 'https://raw.githubusercontent.com/AstarNetwork/brand-assets/main/Astar%20Identity/logo/symbol/Astar_ring.png',
  },
  // Moonbeam
  {
    name: 'Moonbeam',
    chainId: 1284,
    symbol: 'GLMR',
    rpc: `${baseRPC}/moonbeam/mainnet`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/moonbeam/info/logo.png',
  },
  // Fantom
  {
    name: 'Fantom Opera',
    chainId: 250,
    symbol: 'FTM',
    rpc: `${baseRPC}/fantom/mainnet`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/fantom/info/logo.png',
  },
  // Arbitrum (ETH L2)
  {
    name: 'Arbitrum One',
    chainId: 42161,
    symbol: 'ETH',
    rpc: `${baseRPC}/arbitrum/mainnet`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png',
  },
  // Optimism (ETH L2)
  {
    name: 'Optimism',
    chainId: 10,
    symbol: 'ETH',
    rpc: `${baseRPC}/optimism/mainnet`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png',
  },
  // Celo
  {
    name: 'Celo Mainnet',
    chainId: 42220,
    symbol: 'CELO',
    rpc: `${baseRPC}/celo/mainnet`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/celo/info/logo.png',
  },
  // Aurora
  {
    name: 'Aurora Mainnet',
    chainId: 1313161554,
    symbol: 'ETH',
    rpc: `${baseRPC}/aurora/mainnet`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/aurora/info/logo.png',
  },
  // Shiden (Astar on Kusama)
  {
    name: 'Shiden',
    chainId: 336,
    symbol: 'SDN',
    rpc: `${baseRPC}/shiden/mainnet`,
    icon: 'https://raw.githubusercontent.com/AstarNetwork/brand-assets/main/Shiden%20Identity/Shiden-Symbol.png',
  },
  // Moonriver (Moonbeam on Kusama)
  {
    name: 'Moonriver',
    chainId: 1285,
    symbol: 'MOVR',
    rpc: `${baseRPC}/moonriver/mainnet`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/moonriver/info/logo.png',
  }
]

export const Testnets: Network[] = [
  // Ethereum Goerli
  {
    name: 'Goerli',
    chainId: 5,
    symbol: 'ETH',
    rpc: `${baseRPC}/ethereum/goerli`,
    icon: 'https://chainlist.org/unknown-logo.png',
  },
  // Ethereum Sepolia
  {
    name: 'Sepolia',
    chainId: 11155111,
    symbol: 'ETH',
    rpc: `${baseRPC}/ethereum/sepolia`,
    icon: 'https://chainlist.org/unknown-logo.png',
  },
  // Avalanche Fuji Testnet
  {
    name: 'Avalanche Fuji C-Chain',
    chainId: 43113,
    symbol: 'AVAX',
    rpc: `${baseRPC}/avalanche/fuji/c`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchecfuji/info/logo.png',
  },
  // Polygon Mumbai
  {
    name: 'Mumbai',
    chainId: 80001,
    symbol: 'MATIC',
    rpc: `${baseRPC}/polygon/mumbai`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygonmumbai/info/logo.png',
  },
  // Binance Smart Chain
  {
    name: 'Binance Smart Chain Testnet',
    chainId: 97,
    symbol: 'tBNB',
    rpc: `${baseRPC}/bnb/testnet`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bnbt/info/logo.png',
  },
  // Fantom Testnet
  {
    name: 'Fantom Testnet',
    chainId: 4002,
    symbol: 'FTM',
    rpc: `${baseRPC}/fantom/testnet`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/fantom/info/logo.png',
  },
  // Celo Alfajores Testnet
  {
    name: 'Celo Alfajores',
    chainId: 44787,
    symbol: 'CELO',
    rpc: `${baseRPC}/celo/alfajores`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/celo/info/logo.png',
  },
  // Aurora Testnet
  {
    name: 'Aurora Testnet',
    chainId: 1313161555,
    symbol: 'ETH',
    rpc: `${baseRPC}/aurora/testnet`,
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/aurora/info/logo.png',
  }
]

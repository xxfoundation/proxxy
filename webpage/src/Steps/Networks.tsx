import { Box, Link, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { theme } from "../theme";

interface Network {
    name: string;
    chainId: number;
    rpc: string;
    explorer: string;
    icon: string;
}

const networks: Network[] = [
  {
    'name': 'Mainnet',
    'chainId': 1,
    'rpc': 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    'explorer': 'https://etherscan.io',
    'icon': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png'
  },
  {
    'name': 'Ropsten',
    'chainId': 3,
    'rpc': 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    'explorer': 'https://ropsten.etherscan.io',
    'icon': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png'
  },
  {
    'name': 'Goerli',
    'chainId': 5,
    'rpc': 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    'explorer': 'https://goerli.etherscan.io',
    'icon': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png'
  },
]

export const Networks = () => {
    return (
        <Stack alignItems={"center"} sx ={{ m: 4 }}>
            <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>Supported Networks</Typography>
            {networks.length === 0 
            ? <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>No networks found</Typography>
            :
            <Table sx={{ width: '200px' }} aria-label="Supported Networks Table">
                <TableHead>
                    {/* <TableRow>
                        <TableCell>Icon</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Explorer</TableCell>
                    </TableRow> */}
                </TableHead>
                <TableBody>
                    {Object.values(networks).map((network: Network) => (
                        <TableRow key={network.name}>
                            <TableCell><Box><img width="30" alt="icon" src={network.icon}/></Box></TableCell>
                            <TableCell>{network.name}</TableCell>
                            <TableCell>{network.chainId}</TableCell>
                            <TableCell><Link href={network.explorer}>explorer</Link></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            }
        </Stack>
    );
}
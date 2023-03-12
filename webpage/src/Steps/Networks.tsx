

import { Box, Link, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { theme } from "../theme";

interface Network {
    name: string;
    chainId: number;
    rpc: string;
    explorer: string;
    icon: string;
}

interface Props {
    networks: Network[];
}

export const Networks = ({networks}: Props) => {
    return (
        <Stack alignItems={"center"} sx ={{ m: 4 }}>
            <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>Supported Networks</Typography>
            {networks.length === 0 
            ? <Typography variant="body3" sx={{ color: theme.palette.text.primary }}>No networks found</Typography>
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
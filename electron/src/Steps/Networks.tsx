

import { Alert, Link, Stack, Typography } from "@mui/material";
import { theme } from "../theme";

interface Props {
    networks: string[]
}

export const Networks = ({networks}: Props) => {
    return (
        <Stack spacing={3}>
            <Stack sx={{ width: '220px', textAlign: 'left' }}>
                <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>Supported Networks</Typography>
                {networks.map(network => (
                    <Typography key={network} variant="body2">
                        {network}
                    </Typography>
                ))}
            </Stack>
            <Alert variant={'outlined'} severity={'info'} sx={{ 
                fontSize: '12px',
                textAlign: 'left',
                padding: '4px 8px',
                color: theme.palette.primary.contrastText
            }}>
                Go back to <i><b>Proxxy Webpage</b></i> to connect to a different network through cmix. <br/>
            </Alert>
        </Stack>
    );
}
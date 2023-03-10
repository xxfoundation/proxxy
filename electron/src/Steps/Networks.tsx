

import { Stack, Typography } from "@mui/material";
import { theme } from "../theme";

interface Props {
    networks: string[]
}

export const Networks = ({networks}: Props) => {
    return (
        <Stack alignItems={"center"} sx ={{ m: 4 }}>
            <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>Supported Networks</Typography>
            {networks.map(network => (
                <Typography variant="body2">
                    {network}
                </Typography>
            ))}
        </Stack>
    );
}
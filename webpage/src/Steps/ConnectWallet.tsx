import { Alert, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ConnectMetamask } from "../Components/ConnectMetamask";
import { Connected } from "./CheckCmixConnection";

interface Props {
    setWalletConnected: (walletConnected: boolean) => void;
}

export const ConnectWallet = ({setWalletConnected}: Props) => {
    const [account, setAccount] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (account !== undefined) {
            setWalletConnected(true);
        }
    }, [account, setWalletConnected]);

    return (
        <Stack alignItems={"center"} spacing={3}>
            {Connected}
            {account === undefined ? 
                <ConnectMetamask setAccount={setAccount} />
            : 
                <Stack alignItems={"center"} spacing={1}>
                    <Alert variant='filled' sx={{ padding: '4px 10px', mb: 1 }}>
                        <Typography variant='body4' fontWeight={700}>Wallet Connected!<br/></Typography>
                        <Typography variant='body4' sx={{ fontFamily: 'monospace', pr: 1}}>{account}</Typography>
                    </Alert>
                </Stack>
            }
        </Stack>
    );
}
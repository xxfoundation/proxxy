import { Button, Stack, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { theme } from '../theme';
import { RoundedButtonContainer } from '../Utils/utils';

interface Props {
    title: string;
    label: string;
}

export const DownloadApp: React.FC<Props> = ({ title, label }) => {
    const [loading, setLoading] = React.useState(false);

    const download = useCallback(() => {
        setLoading(true);
        try {
            setLoading(false);
        } catch (error) {
            
        }
    }, []);

  return (
    <Stack direction={'column'} alignSelf={"center"} spacing={3}>
        <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>{title}</Typography>
        {RoundedButtonContainer('Download', download)}
    </Stack>
  );
};

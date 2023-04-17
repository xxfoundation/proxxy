import React, { useCallback } from 'react'
import {
  Typography,
  Collapse,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material'
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material'
import { theme } from '../theme'

interface Props {
  title: string
  children: React.ReactNode
  expanded: boolean
  setExpanded: () => void
}

export const ExpandItem: React.FC<Props> = ({ title, children, expanded, setExpanded }) => {
  return (
    <Stack alignSelf={'baseline'}>
      <ListItemButton
        onClick={setExpanded}
        sx={{
          p: 1,
          borderRadius: '10px 10px 0 0',
          color: theme.palette.primary.main,
        }}
      >
        <ListItemText
          primary={
            <Typography variant='h5' sx={{ color: theme.palette.primary.main }}>
              {title}
            </Typography>
          }
        />
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse
        in={expanded}
        timeout='auto'
        unmountOnExit
        sx={{
          maxHeight: '300px',
          overflowY: 'scroll',
          textAlign: 'justify',
          pb: 1,
          px: 1,
          borderRadius: '0 0 10px 10px',
          backgroundImage: `linear-gradient(to bottom, #242424,#242424,#242424,#242424,#242424,#242424,#242424,#242424,#242424,#4f4f4f)`,
        }}
      >
        {children}
      </Collapse>
    </Stack>
  )
}

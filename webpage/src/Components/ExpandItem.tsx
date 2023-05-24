import React from 'react'
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
    <Stack alignSelf={'baseline'} sx={{minWidth: 'inherit'}}>
      <ListItemButton
        onClick={setExpanded}
        sx={{
          p: 1.2,
          border: '2px inset white',
          borderRadius: expanded ? '12px 12px 0 0' : '12px',
          color: 'white',
          backgroundColor: expanded ? theme.palette.primary.main + '90' : '',
          "&:hover": {
            backgroundColor: theme.palette.primary.main + '90',
          },
        }}
      >
        <ListItemText
          primary={
            <Typography variant='h5' sx={{ color: 'white', paddingLeft: 1.2 }}>
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
          minWidth: 'inherit', 
          overflowY: 'scroll',
          textAlign: 'justify',
          pb: 1,
          border: '2px inset white',
          borderRadius: '0 0 10px 10px',
          backgroundImage: `linear-gradient(to bottom, #242424,#242424,#242424,#242424,#242424,#242424,#242424,#242424,#242424, ${theme.palette.primary.main + '90'})`,
        }}
      >
        {children}
      </Collapse>
    </Stack>
  )
}

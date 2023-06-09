import { createTheme } from '@mui/material/styles'
export * from './types'

const palette = {
  primary: {
    main: '#00A2D6',
    contrastText: '#FFF',
  },
  secondary: {
    main: '#08CDD7',
    contrastText: '#FFF',
  },
  warning: {
    main: '#FFC908',
  },
  success: {
    main: '#59BD1C',
  },
  text: {
    primary: '#fff',
    secondary: '#4f4f4f',
  },
  grey: {
    50: '#FFFFFF',
    100: '#FCFCFC', // light backgrounds
    200: '#EAEAEA', // line grey
    300: '#D2D2D2', // grey
    400: '#9A9A9A', // med grey 2
    500: '#7A7A7A', // med grey
    600: '#4F4F4F', // backgrounds
    700: '#3D3D3D', // dark grey
    800: '#27272B', // black header
  },
}

export const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: 24,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          "& .MuiAlert-icon": {
            fontSize: 26,
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          fontSize: 26,
        },
      },
    },
  },
  palette,
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontSize: 55,
      fontWeight: 960,
      color: palette.grey[700],
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    h2: {
      fontSize: 43,
      fontWeight: 840,
    },
    h3: {
      fontSize: 19,
      fontWeight: 840,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      color: palette.grey[600],
    },
    h4: {
      fontSize: 17,
      fontWeight: 600,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    h5: {
      fontSize: 14,
      fontWeight: 840,
      textTransform: 'uppercase',
    },
    h6: {
      fontSize: 16,
      fontWeight: 840,
      letterSpacing: 1.5,
      color: palette.grey[500],
      textTransform: 'uppercase',
    },
    subheader4: {
      fontSize: 17,
      fontWeight: 480,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      color: palette.grey[400],
    },
    body1: {
      fontWeight: 600,
    },
    body2: {
      fontWeight: 840,
      fontSize: 17,
      color: palette.grey[500],
    },
    body3: {
      fontWeight: 400,
      letterSpacing: 0.5,
      fontSize: 17,
      lineHeight: 1.5,
      color: palette.grey[600],
    },
    body4: {
      fontWeight: 480,
      fontSize: 15,
    },
    body5: {
      fontWeight: 480,
      fontSize: 12,
    },
    button: {
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: '24px',
      fontWeight: 480,
      color: palette.grey[500],
    },
  },
  gradients: {
    primary:
      'linear-gradient(68.04deg, #4668BF 14.57%, #2581D6 41.33%, #019CB1 72.19%, #01ACAC 96.47%, #959595 112.54%)',
    secondary:
      'linear-gradient(68.04deg, #62A3FF 14.57%, #3FBAFD 41.33%, #38CCE8 72.19%, #7AEBEF 96.47%, #FFFFFF 112.54%)',
  },
  shape: {
    borderRadius: 13,
  },
  borders: {
    light: '1.2px solid #EAEAEA',
  },
  boxShadow: '0px 42px 101px 3.6px rgba(0, 0, 0, 0.04)',
})

export type { Theme } from '@mui/material'

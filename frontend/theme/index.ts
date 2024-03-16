'use client';

import { buttonClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { londrinaSolid, roboto } from '@/fonts';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a192b'
    },
    primary: {
      main: '#fff'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          [`& .${buttonClasses.endIcon}`]: {
            marginLeft: '5px'
          }
        }
      }
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' },
          style: { fontFamily: londrinaSolid.style.fontFamily, fontWeight: 400 }
        },
        {
          props: { variant: 'h2' },
          style: { fontFamily: londrinaSolid.style.fontFamily, fontWeight: 400 }
        },
        {
          props: { variant: 'h3' },
          style: { fontFamily: londrinaSolid.style.fontFamily, fontWeight: 400 }
        },
        {
          props: { variant: 'h4' },
          style: { fontFamily: londrinaSolid.style.fontFamily, fontWeight: 400 }
        },
        {
          props: { variant: 'h5' },
          style: { fontFamily: londrinaSolid.style.fontFamily, fontWeight: 400 }
        },
        {
          props: { variant: 'h6' },
          style: { fontFamily: londrinaSolid.style.fontFamily, fontWeight: 400 }
        }
      ]
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0c1e33'
        }
      }
    }
  }
});

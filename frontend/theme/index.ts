'use client';

import { createTheme } from '@mui/material/styles';
import { londrinaSolid, roboto } from '@/fonts';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0A1620'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' },
          style: { fontFamily: londrinaSolid.style.fontFamily }
        },
        {
          props: { variant: 'h2' },
          style: { fontFamily: londrinaSolid.style.fontFamily }
        },
        {
          props: { variant: 'h3' },
          style: { fontFamily: londrinaSolid.style.fontFamily }
        },
        {
          props: { variant: 'h4' },
          style: { fontFamily: londrinaSolid.style.fontFamily }
        },
        {
          props: { variant: 'h5' },
          style: { fontFamily: londrinaSolid.style.fontFamily }
        },
        {
          props: { variant: 'h6' },
          style: { fontFamily: londrinaSolid.style.fontFamily }
        }
      ]
    }
  }
});

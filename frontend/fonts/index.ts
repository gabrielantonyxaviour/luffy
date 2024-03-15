import localFont from 'next/font/local';
import { Roboto } from 'next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
});

export const londrinaSolid = localFont({
  src: [
    {
      path: './Londrina-Solid-Light.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: './Londrina-Solid-Regular.ttf',
      weight: '400',
      style: 'normal'
    }
  ]
});

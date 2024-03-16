import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import type { Metadata } from 'next';
import { theme } from '@/theme';
import { DynamicProvider, Header } from '@/components';

export const metadata: Metadata = {
  title: 'Luffy',
  description:
    'Blockchain-based fantasy football game for the 2024 European Championship'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <AppRouterCacheProvider>
          <DynamicProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Header />
              <Container maxWidth='xl'>{children}</Container>
            </ThemeProvider>
          </DynamicProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

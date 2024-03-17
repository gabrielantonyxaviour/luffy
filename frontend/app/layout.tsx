import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import type { Metadata } from "next";
import { theme } from "@/theme";
import { DynamicProvider, Header, SubmitEnsDialog } from "@/components";
import { useGeneralContext, GeneralProvider } from "@/contexts";

export const metadata: Metadata = {
  title: "Luffy",
  description:
    "Blockchain-based fantasy football game for the 2024 European Championship",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <DynamicProvider>
            <GeneralProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                {children}
                <SubmitEnsDialog />
              </ThemeProvider>
            </GeneralProvider>
          </DynamicProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

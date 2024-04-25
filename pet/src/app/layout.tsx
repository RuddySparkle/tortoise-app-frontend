import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Fira_Sans_Condensed } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@mui/material/styles';
import { THEME } from '@core/theme/theme';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });
const fira_sans_condensed = Fira_Sans_Condensed({ weight: ['600'], subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Petpal',
    description: 'by Tortoise not Lonely',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ThemeProvider theme={THEME}>
                <body className={fira_sans_condensed.className}>{children}</body>
            </ThemeProvider>
        </html>
    );
}

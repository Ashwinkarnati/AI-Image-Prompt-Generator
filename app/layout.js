// app/layout.jsx
import { Host_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { UserProvider } from './provider';

const hostGrotesk = Host_Grotesk({
  subsets: ['latin'],
});

export const metadata = {
  title: 'PromptGenius',
  description: 'Generate Perfect Image Prompts for AI Art',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={hostGrotesk.className}>
        <Providers>
          <UserProvider>
            {children}
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
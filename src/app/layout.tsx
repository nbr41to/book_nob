import '@/styles/globals.css';
import '@mantine/core/styles.css';

import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import Link from 'next/link';
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import {ToggleTheme} from './components/ToggleTheme';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='ja'>
      <head>
        <ColorSchemeScript defaultColorScheme='dark' />
      </head>
      <body className={inter.className}>
        <MantineProvider defaultColorScheme='dark'>
          <header className='flex justify-between items-center py-3 px-4 border-b h-16'>
            <div className='flex items-end gap-4'>
              <Link className='font-bold text-2xl group' href='/'>
                <h1>
                  <span className='group-hover:hidden'>😋 </span>
                  <span className='group-hover:inline hidden'>🎃 </span>
                  BOOK^NOB 📚
                </h1>
              </Link>
              <div className='space-x-4 font-bold'>
                <Link
                  className='hover:-translate-y-[2px] inline-block'
                  href='/'
                >
                  Home
                </Link>
                <Link
                  className='hover:-translate-y-[2px] inline-block'
                  href='/books'
                >
                  Books
                </Link>
              </div>
            </div>
            <ToggleTheme />
          </header>

          <main className='p-8 h-[calc(100vh-96px)]'>{children}</main>

          <footer className='grid place-content-center font-bold border-t h-8 '>
            © progLearning
          </footer>
        </MantineProvider>
      </body>
    </html>
  );
}

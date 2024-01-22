'use client';
import Loading from '@/components/Loading';
import { AUTHINTERCEPTOR, LoadingContext } from '@/services/ApiUtil';
import { useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import './globals.css';

const toastOptions = {
  error: {
    style: {
      background: '#D8000C',
      color: 'white'
    },
    iconTheme: {
      primary: '#ffffff',
      secondary: '#D8000C'
    }
  },
  success: {
    style: {
      background: '#4F8A10',
      color: 'white'
    },
    iconTheme: {
      primary: '#ffffff',
      secondary: '#4F8A10'
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const isScreenMounted = useRef(false);

  useEffect(() => {
    isScreenMounted.current = true;
  }, []);

  useEffect(() => {
    setIsLoading(!isScreenMounted.current);
  }, [isLoading, isScreenMounted]);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Kanban Board </title>
        <link rel="icon" type="img/png" href="/favicon.png" />
      </head>
      <body style={{ minHeight: '100vh' }}>
        <AnimatePresence mode="wait" initial={false}>
          <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            <AUTHINTERCEPTOR>
              <Toaster position="bottom-right" toastOptions={toastOptions} reverseOrder={false} key="toast" />
              {isLoading && <Loading />}
              {children}
            </AUTHINTERCEPTOR>
          </LoadingContext.Provider>
        </AnimatePresence>
      </body>
    </html>
  );
}

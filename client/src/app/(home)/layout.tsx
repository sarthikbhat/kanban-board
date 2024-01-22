'use client';
import Navbar from '@/components/Navbar';
import Layout from '@/components/Layout';
import './styles.css';

interface ILayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: ILayout) {

  return (
    <>
      <Layout>
        <main className="relative flex flex-col" style={{ minHeight: '100vhvh' }}>
          <Navbar />
          <section>{children}</section>
        </main>
      </Layout>
    </>
  );
}

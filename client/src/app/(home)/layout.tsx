import Navbar from '@/components/Navbar';
import Layout from '@/components/Layout';
import './styles.css';
import { Metadata } from 'next';

interface ILayout {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  openGraph: {
    title: 'Flashback',
    description: 'Test Description',
    images: [
      {
        url: 'https://flashbackimagesthumbnail.s3.ap-south-1.amazonaws.com/Aarthi_Vinay_19122021/Ec_E__DSC1682.jpg'
      }
    ]
  }
};

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

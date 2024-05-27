import Navbar from '@/components/Navbar';
import Layout from '@/components/Layout';
import { Metadata, ResolvingMetadata } from 'next';
import { headers } from 'next/headers';
import { url } from 'inspector';

interface ILayout {
  children: React.ReactNode;
}

// const headersList = headers();

// export const metadata: Metadata = {
//   openGraph: {
//     title: 'Flashback',
//     description: 'Test Description',
//     images: [
//       {
//         url: 'https://flashbackimagesthumbnail.s3.ap-south-1.amazonaws.com/Aarthi_Vinay_19122021/Ec_E__DSC1682.jpg'
//       },
//       {
//         url:headersList.get('next-url') || ""
//       }
//     ]
//   }
// };


export default function RootLayout({ children }: ILayout) {
  // read the custom x-url header
  // const header_url = headersList.get('next-url') || "";
  // console.log(header_url);

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

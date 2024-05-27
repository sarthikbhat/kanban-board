import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import React from "react"

// export const metadata: Metadata = {
//   openGraph: {
//     title: 'Flashback',
//     description: 'Test Description',
//     images: [
//       {
//         url: 'https://flashbackimagesthumbnail.s3.ap-south-1.amazonaws.com/Aarthi_Vinay_19122021/Ec_E__DSC1682.jpg'
//       }
//     ]
//   }
// };

type Props = {
  params: { eventName: string; userId: String };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const head = headers();
  const header_url = head.get('next-url') || '';
  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
  console.log(params);
  console.log(searchParams);
  // console.log(parent);
  return {
    title: 'Flashbacksss',
    openGraph: {
      title: 'sdsdsd',
      images: [{ url: params.eventName }]
    }
  };
}


const name = () => {
  return (
    <div>
      DEMOOOOO
    </div>
  )
};

export default name;

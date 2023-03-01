import Head from 'next/head'
import dynamic from 'next/dynamic';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { initApp } from '@/lib/weavy';

const PostsComponent = dynamic(async () => await (await import("@weavy/uikit-react")).Posts, {
  loading: () => <span>Loading feed...</span>,
  ssr: false
})

type Props = {
  uid: string, 
  title: string,  
}

export default function Feeds({uid, title}: Props) {
  
  return (
    <>
      <Head>
        <title>Feeds</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container p-4">        
          <PostsComponent uid={uid} />        
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession({req: context.req})
  const url = context.resolvedUrl;
  const uid = url.substring(url.lastIndexOf('/') + 1);
  
  if (session && uid) {
    const response = await initApp({ uid: uid, name: "Feed", type: "posts", userId: session?.user.id });
    let json = await response.json();

    return {
      props: { uid: json.uid, title: json.display_name }, // will be passed to the page component as props
    }
  }

  return { props: {} }
}

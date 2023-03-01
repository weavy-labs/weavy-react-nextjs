import Head from 'next/head'
import prisma from "@/lib/prisma";
import { GetServerSideProps } from 'next';
import { User } from '@prisma/client';
import Avatar from 'react-avatar';
import Link from 'next/link';
import Script from 'next/script';
import { getSession } from 'next-auth/react';

type Props = {
  users: User[],
  user: User
}

export default function Users({ users, user }: Props) {

  return (
    <>
      <Head>
        <title>Users</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <div className="container p-4">
        <h1>Users</h1>
        <table className='table table-users'>

          <tbody>
            {users?.map((u) => (
              <tr key={'u' + u.id}>
                <td><Avatar size='24' name={u.name || ""} round={true} /></td>
                <td>{u.name} <small className="text-muted">@{u.username}</small></td>
                {user.admin &&
                  <td><Link href={`/users/edit/${u.id}`}><span data-feather="edit"></span></Link></td>
                }

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Script>{`feather.replace();`}</Script>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession({ req: context.req })
  let user = null;
  if (session?.user.id) {
    user = await prisma.user.findFirst({
      where: {
        id: parseInt(session?.user.id.toString())
      }
    });


  }

  const users = await prisma.user.findMany();
  return { props: { users, user } }
}
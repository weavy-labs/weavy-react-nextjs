import Head from 'next/head'
import prisma from "@/lib/prisma";
import { GetServerSideProps } from 'next';
import { User } from '@prisma/client';
import Avatar from 'react-avatar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

type Props = {
  user: User
}

export default function EditUser({ user }: Props) {
  const [name, setName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setName(user.name!);
      setJobTitle(user.title);
      setEmail(user.email);
      setPhone(user.phone);
      setIsAdmin(user.admin);
    }
  }, [user]);

  const updateUser = async () => {
    // update user
    const response = await fetch("/api/user", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.id, name: name, title: jobTitle, email: email, phone: phone, admin: isAdmin })
    });

    router.push('/users')
  }

  return (
    <>
      <Head>
        <title>Edit user</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <div className="container p-4">
        {user &&
          <fieldset>
            <legend className="text-center">Edit user</legend>
            <div className="row g-3">
              <div className="col-12 text-center">
                <Avatar size="128" round={true} name={user.name!} />
              </div>

              <div className="col-12">
                <label className="form-label">Name</label>
                <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                <span className="form-text">Display name.</span>
              </div>

              <div className="col-12">
                <label className="form-label">Job title</label>
                <input className="form-control" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                <span className="form-text">Job title.</span>
              </div>

              <div className="col-12">
                <label className="form-label">Email</label>
                <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                <span className="form-text">Primary email address (must be unique).</span>
              </div>

              <div className="col-12">
                <label className="form-label">Phone</label>
                <input className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <span className="form-text">Preferred telephone number.</span>
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox"  checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} id="flexCheckChecked" />
                  <label htmlFor="flexCheckChecked">
                    Administrator <span className="form-text">Check to give the user administrative rights.</span>
                  </label>
                </div>
              </div>



              <div className="col-12">
                <button onClick={updateUser} className="btn btn-primary">Save</button>
                <Link href="/users" className="btn btn-link">Cancel</Link>
              </div>
            </div>
          </fieldset>
        }


      </div>

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params?.id) {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(context.params.id.toString())
      }
    });

    return { props: { user } }
  }

  return { props: {} }
}

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/prisma";
import { getUserName } from '@/lib/weavy';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, email, phone, title, admin , directory} = req.body;

  // update user in db
  await prisma.user.update({
    where: {
      id: id,
    }, data: {
      name: name,
      title: title,
      phone: phone,
      email: email,
      admin: admin
    }
  })

  // sync some of the user data to Weavy
  let response = await fetch(`${process.env.WEAVY_URL}/api/users/${getUserName(id)}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${process.env.WEAVY_APIKEY}`
    },
    body: JSON.stringify({...req.body})
  });

  if (response.ok) {
    res.status(200).json("Updated");
  } else {
    res.json({ message: "Could not update user!" })
  }


}
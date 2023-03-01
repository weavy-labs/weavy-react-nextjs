
import { NextApiRequest, NextApiResponse } from 'next';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, count_only } = req.query;

  // get Weavy notifications
  let response = await fetch(`${process.env.WEAVY_URL}/api/notifications?order_by=id+desc&unread=true${(count_only != null ? "&count_only=true" : "")}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(500).json({ error: "Could not get notifications from Weavy!" })
  }


}
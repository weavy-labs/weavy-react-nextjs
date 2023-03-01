
import { NextApiRequest, NextApiResponse } from 'next';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, text } = req.body;

  // post a message to Weavy
  let response =await fetch(`${process.env.WEAVY_SERVER}/api/apps/${id}/messages`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${process.env.WEAVY_APIKEY}`,
        'Content-Type': 'application/json',
    },    
    body: JSON.stringify({
        text: text
    })
});

  if (response.ok) {
    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(500).json({ error: "Could not submit message to Weavy!" })
  }


}
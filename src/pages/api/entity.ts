
import { NextApiRequest, NextApiResponse } from 'next';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, id } = req.query;
  let endpoint = "";

  switch (type) {
    case "app":
      endpoint = "api/apps/" + id;
      break;
    case "comment":
      endpoint = "api/comments/" + id;
      break;
    case "file":
      endpoint = "api/files/" + id;
      break;
    case "message":
      endpoint = "api/messages/" + id;
      break;
    case "user":
      endpoint = "api/users/" + id;
      break;
    case "post":
      endpoint = "api/posts/" + id;
      break;
  }

  // get Weavy entity
  let response = await fetch(`${process.env.WEAVY_URL}/${endpoint}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.WEAVY_APIKEY}`,
      'Content-Type': 'application/json',
    }    
  });

  if (response.ok) {
    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(500).json({ error: "Could not get entity from Weavy!" })
  }


}
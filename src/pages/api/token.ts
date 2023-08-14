
import { getUserName } from '@/lib/weavy';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

type Token = {
  userId: string | number,
  access_token: string
}
let _tokens: Token[] = [];
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const refresh = req.query.refresh;
  const session = await getSession({ req })
  
  if (!session) {
    res.json({ message: "Could not get access token from server!" })
  } else {
    if (session.user) {
      const userId = session.user.id;      

      if ((!refresh || refresh === "false") && _tokens.find((t) => t.userId === userId)) {
        res.json({ access_token: _tokens.find((t) => t.userId === userId)?.access_token });
      } else {
        let response = await fetch(`${process.env.WEAVY_URL}/api/users/${getUserName(userId)}/tokens`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${process.env.WEAVY_APIKEY}`
          },
          body: JSON.stringify({ expires_in: 3600 })
        });

        if (response.ok) {          
          let data = await response.json();
          _tokens = [..._tokens.filter((t) => t.userId !== userId), { userId: userId, access_token: data.access_token }];
          res.status(200).json({ access_token: data.access_token })
        } else {
          res.json({ message: "Could not get access token from server!" })
        }
      }
    } else {
      res.json({ message: "Could not get access token from server!" })
    }
  }
}
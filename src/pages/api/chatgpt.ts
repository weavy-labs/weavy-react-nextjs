import { NextApiRequest, NextApiResponse } from "next";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const OPENAI_BASE_URL = "https://api.openai.com/v1";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { messages, username } = req.body;

  console.log({ messages, username });
  

  const request = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      user: username
    }),
  });

  if (request.ok) {
    const data = await request.json();    
    res.status(200).json(data);
  } else {    
    const error = await request.json()
    console.log(error);

    res.status(500).json({ error: "Error generating response from ChatGPT" });
  }
}

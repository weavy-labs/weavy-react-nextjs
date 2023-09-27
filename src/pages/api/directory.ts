import { NextApiRequest, NextApiResponse } from "next";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let directoryEndpoint = `${process.env.WEAVY_URL}/api/directories`;
  const directory_id = req?.query?.directory_id

  if (directory_id) {
    directoryEndpoint = `${directoryEndpoint}/${directory_id}/members`
  }

  let response = await fetch(directoryEndpoint, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.WEAVY_APIKEY}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(500).json({ error: "Could not retrieve directories", response });
  }
}

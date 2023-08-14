import {NextApiRequest, NextApiResponse} from 'next';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const extractUrlFromText = (text: string) => text.match(/(https?:\/\/[^ ]*)/);

interface ApiClientProps {
    endpoint: string
    method?: string
    body?: any,
    auth?: string
}

export const ApiClient = async ({endpoint, method = "GET", body, auth = process.env.WEAVY_APIKEY}: ApiClientProps) => {
    try {
        return await fetch(`${process.env.WEAVY_URL}/api${endpoint}`, {
            method,
            headers: {
                'Authorization': `Bearer ${auth}`,
                "Content-Type": "application/json",
            },
            body: method === "GET" ? null : JSON.stringify(body),
        });
    } catch (e) {
        console.log(`Error with ${endpoint} endpoint:`, e);
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id, text, token} = req.body;

    const extractedUrl = extractUrlFromText(text);
    let embedId = null;

    if (extractedUrl) {
        const createEmbedData = await ApiClient({
            endpoint: "/embeds",
            method: "POST",
            body: {
                url: extractedUrl[0],
                auth: token
            }
        });

        const embedData = await createEmbedData?.json()
        embedId = embedData?.id;
    }

    const response = await ApiClient({
        method: 'POST',
        endpoint: `/apps/${id}/messages`,
        body: {
            text: text,
            embed_id: embedId,
            auth: token
        }
    });

    if (response?.ok) {
        const data = await response.json();

        res.status(200).json(data);
    } else {
        res.status(500).json({error: "Could not submit message to Weavy!"})
    }
}
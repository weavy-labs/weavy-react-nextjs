import {initApp} from "@/lib/weavy";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/react";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import ChatPreview, {ChatPreviewsProps} from "@/components/ChatPreview";
import {ApiClient} from "@/pages/api/messages";

type Props = {
    id: number,
    uid: string,
    title: string,
}

export default function UrlPreviews({id, uid, title}: Props) {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [messages, setMessages] = useState<ChatPreviewsProps["messages"]>([])

    const retrieveAllMessages = async () => {
        const tokenResponse = await fetch(`/api/token?refresh=${true}`);
        const token = await tokenResponse.json()

        const messagesReq = await ApiClient({
            endpoint: `/apps/${id}/messages`,
            auth: token?.access_token
        })

        const {data} = await messagesReq?.json()
        setMessages(data)
    }

    const handleSubmit = async () => {
        const tokenResponse = await fetch(`/api/token?refresh=${true}`);
        const token = await tokenResponse.json()

        const messageResponse = await fetch(`/api/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                text,
                token: token?.access_token
            })
        });

        if (messageResponse?.ok) {
            const messageJson = await messageResponse?.json();
            setResult(JSON.stringify(messageJson, null, 3));

            await retrieveAllMessages();
            setText("")
        } else {
            console.error("Could not submit message to Weavy")
        }
    }

    useEffect(() => {
        (async () => await retrieveAllMessages())()
    }, [])

    return (
        <div className="d-flex">
            <div className="contextual-app w-50 p-4 overflow-y-auto">
                <h3>URL Previews</h3>
                <p>An example that shows how to generate a URL Preview using <a
                    href={"https://www.weavy.com/docs/reference/api-reference/embeds"} target={"_blank"}> Weavy
                    Embeds </a> through the <code>`/embed`</code> endpoint within the <a
                    href={"https://www.weavy.com/docs/reference/api-reference"} target={"_blank"}> Weavy Web API</a>.
                </p>

                <p>
                    Read the <a href={"https://www.weavy.com/blog/chat-url-previews"} target={"_blank"}> Adding URL
                    Previews to Chat </a> tutorial within the Weavy Blog to learn more.
                </p>

                <div className="mb-3">
                    <label className="form-label">Chat message <br/> Send a message with and without a URL to test
                        previews.</label>
                    <textarea className="form-control" id="messageText" rows={3}
                              placeholder="Write your message here..."
                              value={text} onChange={(e) => setText(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <button id="messageBtn" type="button" className="btn btn-primary" onClick={handleSubmit}>Submit
                    </button>
                </div>
                <div className="mb-3">
                    <label className="form-label">Response</label>
                    <pre className="code"><code id="msgResult">{result}</code></pre>
                </div>
            </div>

            <div className="contextual-app w-50 border-start d-flex">
                <ChatPreview messages={messages}/>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({req: context.req})

    if (session) {
        const response = await initApp({
            uid: "chat-previews-api-example",
            name: "Chat Previews API example",
            type: "chat",
            userId: session?.user.id
        });
        let json = await response.json();
        return {
            props: {id: json.id, uid: json.uid, title: json.display_name}, // will be passed to the page component as props
        }
    }

    return {props: {}}
}

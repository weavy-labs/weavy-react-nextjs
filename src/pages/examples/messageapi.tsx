import { initApp } from "@/lib/weavy";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useState } from "react";

const ChatComponent = dynamic(async () => await (await import("@weavy/uikit-react")).Chat, {
    loading: () => <span>Loading chat...</span>,
    ssr: false
  })

type Props = {
    id: number,
    uid: string,
    title: string,

}

type FormProps = {
    id: number
}

const Form = ({ id }: FormProps) => {

    const [text, setText] = useState("");
    const [result, setResult] = useState("");

    const handleSubmit = async () => {
        
        var messageResponse = await fetch(`/api/messages`, {
            method: 'POST',
            headers: {                
                'Content-Type': 'application/json',
            },            
            body: JSON.stringify({
                id: id,
                text: text
            })
        });
        if (messageResponse.ok) {
            var messageJson = await messageResponse.json();
            setResult(JSON.stringify(messageJson, null, 3));
        } else {
            console.error("Could not submit message to Weavy")
        }
    }

    return (
        <>
            <div className="mb-3">
                <label className="form-label">Chat message</label>
                <textarea className="form-control" id="messageText" rows={3} placeholder="Write your message here..." value={text} onChange={(e) => setText(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
                <button id="messageBtn" type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
            <div className="mb-3">
                <label className="form-label">Response</label>
                <pre className="code"><code id="msgResult">{result}</code></pre>
            </div>
        </>
    )
}

export default function MessageApi({ id, uid, title }: Props) {


    return (


        <div className="d-flex">
            <div className="contextual-app w-50 p-4 overflow-y-auto">
                <h3>Message API</h3>
                <p>Example that shows how to post a chat message via the Web API.</p>

                <Form id={id}/>

            </div>
            <div className="contextual-app w-50 border-start d-flex">                
                <ChatComponent uid={uid} />                
            </div>

        </div>

    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({ req: context.req })

    if (session) {
        const response = await initApp({ uid: "message-api-example", name: "Message API example", type: "chat", userId: session?.user.id });
        let json = await response.json();        
        return {
            props: { id: json.id, uid: json.uid, title: json.display_name }, // will be passed to the page component as props
        }
    }

    return { props: {} }
}

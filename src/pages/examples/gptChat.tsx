import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import prisma from "@/lib/prisma";

interface ChatWindowProps {
  messages: {
    id: string;
    content: string;
    role: string;
  }[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => (
  <div className="chat-window-container">
    <div className="p-2 bg-black flex items-center">
      <p className="text-center"> Conversational Bot Using GPT-3.5 Model </p>
    </div>

    <ul className="ai-message-list">
      {messages.map(({ content, role, id }) => (
        <li key={id}>
          <div>
            <p className="list-text-head">{role}:</p>

            <p>{content}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default function ChatGptAPI({ username }: { username: string }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<ChatWindowProps['messages']>([]);

  const handleSubmit = async () => {
    let tempMessageObj: ChatWindowProps["messages"] = [];

    tempMessageObj.push({
      id: new Date().toString(),
      content: text,
      role: "user",
    });

    var messageResponse = await fetch(`/api/openai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: tempMessageObj.map(({ content, role }) => ({
          content,
          role,
        })),
        username,
      }),
    });

    if (messageResponse.ok) {
      const messageJson = await messageResponse.json();

      const sysObject = {
        id: messageJson.id,
        content: messageJson.choices[0].message.content,
        role: messageJson.choices[0].message.role,
      };

      tempMessageObj.push(sysObject);
      setMessages((data) => [...data, ...tempMessageObj]);
      setText("");
    }
  };

  return (
    <div className="d-flex">
      <div className="contextual-app w-50 p-4 overflow-y-auto">
        <h3>ChatGPT Conversation API</h3>
        <p>
          Example that shows how to interact with OpenAI from your Weavy
          application.
        </p>

        <div>
          <div className="mb-3">
            <label className="form-label">Chat message</label>
            <textarea
              className="form-control"
              id="messageText"
              rows={3}
              placeholder="Write your message here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <button
              id="messageBtn"
              type="button"
              className="btn btn-primary"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </button>
          </div>
          <div className="mb-3">
            <label className="form-label">Response</label>
            <pre className="code">
              <code id="msgResult">{JSON.stringify(messages)}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="contextual-app w-50 border-start d-flex">
        <ChatWindow messages={messages} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  let user = null;

  if (session?.user.id) {
    user = await prisma.user.findFirst({
      where: {
        id: parseInt(session?.user.id.toString()),
      },
    });
  }

  return {
    props: { username: user?.username },
  };
};

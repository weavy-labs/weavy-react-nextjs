import React, {useContext} from "react";

export const truncateText = (text: string, length: number) =>
    text.split(" ").slice(0, length).join(" ");

interface Embed {
    image: string
    thumbnail_url: string;
    title: string;
    original_url: string;
    description: string;
}

interface PostCardProps {
    text: string;
    embed: Embed;
    created_at: string;
    created_by: {
        display_name: string;
    };
}

const PostCard = ({text, embed, created_at, created_by}: PostCardProps) => {
    return (
        <div className={"bg-white border rounded text-dark"} style={{margin: "30px 0"}}>
            {embed && (
                <div style={{background: "#F7F7F9"}} className={"d-flex flex-row"}>
                    {embed?.image && (
                        <img
                            style={{
                                width: "140px",
                                height: "110px",
                                marginRight: "10px",
                                objectFit: "cover"
                            }}
                            src={embed?.thumbnail_url}
                            alt={embed?.title}
                        />
                    )}

                    <div className={"d-flex l-3 align-items-center"}>
                        <div>
                            <p className={"classes.text"}>
                                <a target={"_blank"} rel="no-opener" href={embed.original_url}>
                                    {embed.title}
                                </a>
                            </p>

                            <p> {truncateText(embed.description, 10)}... </p>
                        </div>
                    </div>

                    <div className={"font-lg mr-1 mt-1"}>
                        <span data-feather="link"></span>
                    </div>
                </div>
            )}

            <div className="px-2 py-4">
                <p style={{fontSize: "18px"}} className={"mb-2 text-dark"}>{text}</p>

                <p style={{opacity: .8}} className={"font-italic"}>
                    Posted By <b> {created_by.display_name} </b> On{" "}
                    <b>{new Date(created_at).toLocaleDateString()} </b>
                </p>
            </div>
        </div>
    )
};

export interface ChatPreviewsProps {
    messages: {
        text: string
        id: string
        embed: Embed
        created_at: string
        created_by: {
            display_name: string
        }
    }[]
}

function ChatPreviews({ messages }: ChatPreviewsProps ) {
    return (
        <div>
            {messages && (
                <ul style={{listStyle: "none"}}>
                    {messages.map(({text, id, embed, created_at, created_by}) => (
                        <li className="my-8" key={id}>
                            <PostCard {...{text, embed, created_at, created_by}} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ChatPreviews;

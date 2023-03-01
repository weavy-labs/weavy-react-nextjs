import dynamic from "next/dynamic";
import React from "react";

type Props = {
    onMessengerToggle: Function
}

const BadgeComponent = dynamic(async () => await (await import("@weavy/uikit-react")).ConversationBadge, {    
    ssr: false
  })

  
const MessengerButton = ({onMessengerToggle}: Props) => {
    const handleToggleMessenger = () =>{
        onMessengerToggle();
    }

    return (
        <a className="btn btn-icon" href="#" role="button" onClick={handleToggleMessenger}>
            <span data-feather="message-square"></span>            
            <BadgeComponent />            
        </a>

    )
}

export default MessengerButton;
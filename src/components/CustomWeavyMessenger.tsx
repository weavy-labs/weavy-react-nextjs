
import { MessengerContext, MessengerProvider, ConversationList, Conversation } from '@weavy/uikit-react'
import { useContext } from 'react'

const CustomMessenger = () => {
  const { selectedConversationId } = useContext(MessengerContext)

  return (
    <div className="wy-messenger-conversation wy-scroll-y">
      {selectedConversationId && <Conversation showBackButton={true} />}
      {!selectedConversationId && <ConversationList />}
    </div>  
  )
}

export default function CustomWeavyMessenger() {
  return (
    <MessengerProvider>
      <CustomMessenger />
    </MessengerProvider>
  )
}
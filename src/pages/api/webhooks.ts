import { NextApiResponseWithSocket } from '@/types/socket'
import { NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {

  const { action, actor, notification } = req.body;

  console.debug("Incoming webhook notification from Weavy :)")

  switch (action) {
    case "notification_created":
      res.socket.server.io?.to(notification.user.uid).emit(action);
      break;
    case "notification_updated":
      res.socket.server.io?.to(actor.uid).emit(action);
      break;
  }


  res.end()
}

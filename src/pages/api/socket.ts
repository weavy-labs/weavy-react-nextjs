import { NextApiResponseWithSocket } from '@/types/socket'
import { NextApiRequest } from 'next'
import { Server } from 'socket.io'

export default async function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {

  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io;

    io.on('connection', socket => {
      socket.on("join", userId => {        
        socket.join(userId);
      })
    })
  }
  res.end()
}

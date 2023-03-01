import React, { useEffect, useState } from 'react';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import  { Socket } from 'socket.io-client'

type Props = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
}

const NotificationBadge = ({ socket }: Props) => {
    
    const [count, setCount] = useState(0)

    useEffect(() => {      
        getNotificationCount(false);
    }, []);
   
    useEffect(() => {
        if (socket) {
            socket.on('notification_created', msg => {
                // notification from socket                
                getNotificationCount(false);
            });

            socket.on('notification_updated', msg => {                
                // notification from socket                
                getNotificationCount(false);
            });
        }
    }, [socket])


    const getNotificationCount = async (refresh: boolean, retry: boolean = true) => {
        var tokenResponse = await fetch(`/api/token?refresh=${refresh}`);
        var tokenJson = await tokenResponse.json();

        var notificationResponse = await fetch(`/api/notifications?token=${tokenJson.access_token}&count_only=true`);
        if (notificationResponse.status === 401 && retry) {
            // access token probably expired, try to get new token
            await getNotificationCount(true, false);
        } else if (notificationResponse.status === 200) {
            var notificationJson = await notificationResponse.json();
            setCount(notificationJson.count)
        } else {
            console.error("Could not get notifications from Weavy")
        }
    }

    return (
        <>
        {count > 0 && 
            <span id="notification-badge" className="badge bg-danger">{count}</span>
        }
        </>
        
        
    )
}

export default NotificationBadge
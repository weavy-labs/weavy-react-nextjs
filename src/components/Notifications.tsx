import { DefaultEventsMap } from '@socket.io/component-emitter';
import React, { useEffect, useState } from 'react';
import  { Socket } from 'socket.io-client'
import Notification from './Notification';

type Props = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
}

const Notifications = ({ socket }: Props) => {

    const [notifications, setNotifications] = useState([])   

    useEffect(() => {
        getNotifications(false);
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('notification_created', msg => {                
                // notification from socket                
                getNotifications(false);
            })

            socket.on('notification_updated', msg => {                
                // notification from socket                
                getNotifications(false);
            })
        }
    }, [socket])

    const getNotifications = async (refresh: boolean, retry: boolean = true) => {
        var tokenResponse = await fetch(`/api/token?refresh=${refresh}`);
        var tokenJson = await tokenResponse.json();

        var notificationResponse = await fetch(`/api/notifications?token=${tokenJson.access_token}`);
        if (notificationResponse.status === 401 && retry) {
            // access token probably expired, try to get new token
            await getNotifications(true, false);
        } else if (notificationResponse.status === 200) {
            var notificationJson = await notificationResponse.json();
            setNotifications(notificationJson.data)
        } else {
            console.error("Could not get notifications from Weavy")
        }
    }

    return (
        <div className="card border-0">
            <div className="card-header text-center">Unread notifications</div>
            <div className="card-body p-0">
                <div className="list-group list-group-flush">
                    {notifications && notifications.length > 0 && notifications.map((n: any) => {                        
                        return (
                            <Notification key={`notification-${n.id}`} id={n.id} text={n.plain} type={n.link.type} entityId={n.link.id}/>
                            
                        )
                    })}
                    {(notifications && notifications.length === 0 || !notifications) &&
                        <p className="text-muted text-center my-3"><small>No unread notifications</small></p>
                    }
                </div>
            </div>
            {/* <div className="card-footer text-center p-1 border-0 border-top">
                <a asp-action="index" asp-controller="notifications"><small>Notification history</small></a>
            </div> */}
        </div>
    )
}

export default Notifications
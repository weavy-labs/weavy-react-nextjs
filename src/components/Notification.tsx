
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {    
    id: number,
    text: string,
    type: string,
    entityId: number
}

const Notification = ({ id, text, type, entityId }: Props) => {

    const [app, setApp] = useState<any>()

    useEffect(() => {
        getApp();
    }, []);

    const getApp = async () => {
        const entityResponse = await fetch(`/api/entity?type=${type}&id=${entityId}`);
        if (entityResponse.ok) {
            var e = await entityResponse.json();
            const appResponse = await fetch(`/api/entity?type=app&id=${e.app_id}`);
            const a = await appResponse.json();            
            setApp(a);
        }

    }

    const markAsRead = () => {
        console.log("marked as read");

        const mark = async (refresh: boolean, retry: boolean = true) => {
            var tokenResponse = await fetch(`/api/token?refresh=${refresh}`);
            var tokenJson = await tokenResponse.json();
    
            var markResponse = await fetch(`${process.env.WEAVY_URL}/api/notifications/${id}/mark`, {
                method: 'PUT',
                headers: {
                  'Authorization': `Bearer ${tokenJson.access_token}`,
                  'Content-Type': 'application/json',
                },
            });
            if (markResponse.status === 401 && retry) {
                // access token probably expired, try to get new token
                await mark(true, false);
            }
        }

        mark(false, true)
    }

    return (
        <>
            {app &&
                <Link href={"/weavy/" + app.uid} className="list-group-item" onClick={markAsRead}>{text}</Link>
            }
        </>
    )
}

export default Notification
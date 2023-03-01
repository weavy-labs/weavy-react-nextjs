import Script from "next/script";
import Aside from "./Aside";
import Messenger from "./Messenger";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { getUserName } from "@/lib/weavy";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const WeavyProviderComponent = dynamic(() => import('../components/WeavyWrapper'), {
    loading: () => <span></span>,
    ssr: false
})

const Layout = ({ children }: any) => {

    const [connected, setConnected] = useState(false)
    const [messengerOpen, setMessengerOpen] = useState(false)
    useEffect(() => {
        

        const socketInitializer = async () => {
            await fetch(`/api/socket`)
            socket = io();

            socket.on('connect', () => {
                console.debug("Connected")
                setConnected(true)
            });
        }

        socketInitializer();

        return () => {
            socket.off('connect');
        };
    }, []);

    useEffect(() => {
        const join = async () => {            
            const session = await getSession();
            socket.emit("join", getUserName(session?.user.id))
        }

        if (connected) {
            join();
        }

    }, [connected])

    const handleMessenger = (open: boolean | null) => {
        setMessengerOpen(open != null ? open : !messengerOpen);
    }

    return (
        <>
            <WeavyProviderComponent>
                <NavBar socket={socket} onMessengerToggle={handleMessenger} />
                <main>{children}</main>
                <Aside />
                <Messenger isOpen={messengerOpen} />
                <Script>{`feather.replace();`}</Script>
            </WeavyProviderComponent>            
        </>
    )
}

export default Layout;
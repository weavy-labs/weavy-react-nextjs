import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Avatar from 'react-avatar';
import { signOut } from "next-auth/react";
import Notifications from "./Notifications";
import NotificationBadge from "./NotificationBadge";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket } from 'socket.io-client'
import MessengerButton from "./MessengerButton";
import { initTheme } from "@/lib/theme";

type Props = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    onMessengerToggle: Function
}

const NavBar = ({ socket, onMessengerToggle }: Props) => {    
    const [session, setSession] = useState<Session | null>();

    useEffect(() => {
        const initSession = async () => {
            let s = await getSession();
            setSession(s);
        }
        initSession();
        initTheme();
    }, [])

    const handleToggleMessenger = () =>{
        onMessengerToggle();
    }

    const handleCloseMessenger = () => {
        onMessengerToggle(false);
    }

    return (
        <nav className="navbar navbar-expand fixed-top border-bottom">
            <div className="container-fluid">

                <div className="navbar-nav align-items-center">
                    <Link className="nav-link d-md-none" href="#" data-bs-toggle="offcanvas" data-bs-target="#menu"><span data-feather="menu"></span></Link>
                    <Link href="/" ><img src="/logo.png" height="32" alt="logo" /></Link>
                </div>

                <div className="navbar-nav align-items-center">

                    <button className="btn btn-sm btn-icon mx-2 theme-switcher" type="button" title="Switch theme">
                        <span data-feather="moon"></span>
                        <span data-feather="sun"></span>
                    </button>

                    <div className="dropdown">
                        <button className="btn btn-icon" type="button" data-bs-toggle="dropdown" onClick={handleCloseMessenger}>
                            <span data-feather="bell"></span>
                            <NotificationBadge socket={socket}/>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end py-0">
                            <Notifications socket={socket}/>
                        </div>
                    </div>
                    <MessengerButton onMessengerToggle={handleToggleMessenger} />
                   
                    <div className="dropdown">
                        {session &&
                            <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <Avatar name={session.user?.name ?? ""} size="32px" color="#fd7e14" fgColor="#000000" round={true} maxInitials={2} />
                            </a>
                        }

                        <div className="dropdown-menu dropdown-menu-end">
                            <div className="text-center pt-4 pb-3">
                                {session &&
                                    <>
                                        <Avatar name={session.user?.name ?? ""} size="64px" color="#fd7e14" fgColor="#000000" round={true} maxInitials={2} />
                                        <h6 className="mt-2">{session.user.name}</h6>
                                    </>
                                }

                            </div>
                            <Link href="/users/profile" className="dropdown-item"><span data-feather="user"></span> Profile</Link>

                            {/* <a href="#" className="dropdown-item"><span data-feather="settings"></span> Settings</a> */}
                            <hr className="dropdown-divider" />
                            <div className="d-grid px-3 py-2">
                                <a className="btn btn-secondary" onClick={() => signOut()}><span data-feather="log-out"></span> Sign out</a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </nav>
    )

}

export default NavBar;
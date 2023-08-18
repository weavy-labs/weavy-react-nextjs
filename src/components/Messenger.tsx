import dynamic from 'next/dynamic';

const MessengerComponent = dynamic(() => import('../components/CustomWeavyMessenger'), {
    loading: () => <span></span>,
    ssr: false
})

type Props = {
    isOpen: boolean
}

const Messenger = ({ isOpen }: Props) => {
    return (
        <div className={"offcanvas-end-custom settings-panel border-0 border-start " + (isOpen ? "show" : "")} id="messenger">
            <MessengerComponent />
        </div>
    )
}

export default Messenger;
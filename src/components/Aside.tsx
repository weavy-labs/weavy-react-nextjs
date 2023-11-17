import Link from "next/link";

const Aside = () => {
  return (
    <aside id="menu" className="sidebar offcanvas-md offcanvas-start">

      <div className="offcanvas-header">
        <img src="/logo.png" className="ms-3" height="32" alt="logo" />
        <button className="btn btn-icon pe-2" type="button" data-bs-dismiss="offcanvas" data-bs-target="#menu"><span data-feather="x"></span></button>
      </div>

      <div className="offcanvas-body">

        <nav className="nav flex-column">
          <Link className="nav-link" href="/"><span data-feather="home"></span> Home</Link>
          <Link className="nav-link" href="/users"><span data-feather="users"></span> Users</Link>
          
          <h6 className="sidebar-heading px-3 mt-3 mb-1 text-muted text-uppercase">Weavy apps</h6>

          <Link className="nav-link" href="/weavy/acme-chat"><span data-feather="message-circle"></span> Chat</Link>
          <Link className="nav-link" href="/weavy/acme-feed"><span data-feather="columns"></span> Feeds</Link>
          <Link className="nav-link" href="/weavy/acme-files"><span data-feather="folder"></span> Files</Link>
          
          <h6 className="sidebar-heading px-3 mt-3 mb-1 text-muted text-uppercase">Examples</h6>

          <Link className="nav-link" href="/examples/messageapi"><span data-feather="message-square"></span> Message API</Link>
          <Link className="nav-link" href="/examples/gptChat"><span data-feather="users"></span> ChatGPT Bot</Link>
        </nav>
      </div>
    </aside>
  )

}

export default Aside;
import {Link} from "react-router-dom"
import '../css/Navbar.css'

const Navbar = () => {

  const handleReload = () => {
    if (window.location.pathname === '/') {
      window.location.reload();
    }
    return
  }
  return (
    <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/" >Reactflix</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link" onClick={handleReload}>Home</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
        </div>
    </nav>
  )
}

export default Navbar

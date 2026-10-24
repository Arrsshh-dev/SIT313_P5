import { Link } from "react-router-dom";
import "./App.css";

function Navbar() {
    return (
        <nav className="navbar">

            <h1 className="nav-logo">DEV@Deakin</h1>

            <input
                type="text"
                placeholder="Search"
                className="nav-search"
            />

            <div className="nav-links">  
                <Link to="/Post">
                    Post
                </Link>

                <Link to="/login">
                    Login
                </Link>

                <Link to="/">
                    Home
                </Link>
            </div>

        </nav>
    );
}

export default Navbar;
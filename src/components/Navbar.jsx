import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-home">
                <NavLink to="/home">Pets</NavLink>
            </div>
            <ul className="navbar-links">
                <li><NavLink to="/dogs">Dogs</NavLink></li>
                <li><NavLink to="/cats">Cats</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;
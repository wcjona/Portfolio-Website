import Theme from "./Theme"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import {useState} from "react"
export const NavbarComponent = () => {
    const [showAnimated, setShowAnimated] = useState(false);

    return(
        <Navbar class="navbar" sticky="top" bg="light" expand="lg">
            <Navbar.Brand className="no-underline generic-nav-title" href="#home">Jonathan's Portfolio</Navbar.Brand>
            <Navbar.Toggle type='button'
              className='navbar-toggle'
              data-target='#navbarToggleExternalContent'
              aria-controls='navbarToggleExternalContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setShowAnimated(!showAnimated)}
              >
                <div className={`animated-icon1 ${showAnimated && 'open'}`}>
                    <span className="burger"></span>
                    <span className="burger"></span>
                    <span className="burger"></span>
                </div>
                </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Nav.Link className="generic-nav-link" href="#home">Introduction</Nav.Link>
                <Nav.Link className="generic-nav-link" href="#about_me">About Me</Nav.Link>
                {/* <Nav.Link className="generic-nav-link" href="#home">Experience</Nav.Link>
                <Nav.Link className="generic-nav-link" href="#link">Projects</Nav.Link>
                <Nav.Link className="generic-nav-link" href="#link">Links</Nav.Link> */}
                <a class="nav-link no-underline"><Theme /></a>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
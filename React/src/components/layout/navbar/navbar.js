//import './navbar.css';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
    return (
        <Navbar>
            <Container id="navbar">
                <Navbar.Brand><Nav.Link as={Link} to="/"><Image src={process.env.PUBLIC_URL + "/logo-apside.png"} width="120px" height="40px"/></Nav.Link></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                    <Nav.Link as={Link} to="/EditCollaborater">Gestion des collaborateurs</Nav.Link>
                    <Nav.Link as={Link} to="/EditEquipmentType">Gestion des types d'équipements</Nav.Link>
                    <Nav.Link as={Link} to="/EditEquipment">Gestion des équipements</Nav.Link>
                    <Nav.Link as={Link} to="/AssignEquipment">Affectation des équipements</Nav.Link>
                </Nav>
                <Nav.Link as={Link} to="/Logout">
                    <Button type="submit" className=".bg-orange">
                        <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                    </Button>
                </Nav.Link>
            </Container>
        </Navbar>
    );
}
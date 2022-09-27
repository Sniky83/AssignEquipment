//import './footer.css';
import { Navbar, Container } from 'react-bootstrap';

export default function Footer() {
    return (
        <Navbar fixed="bottom">
            <Container id="footer">
                <Navbar.Collapse className="justify-content-center">
                    <Navbar.Text>
                        Projet affectation d'équipements
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
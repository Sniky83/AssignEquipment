//import './body.css';
import Routage from '../../routage/routage';
import { Container } from 'react-bootstrap';

export default function Body() {
    return (
        //Point d'entrée de l'application
        <Container id="body">
            <Routage/>
        </Container>
    );
}
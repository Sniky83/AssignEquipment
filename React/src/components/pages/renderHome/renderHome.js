import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import getCollaboraters from '../../../redux/reducers/home/homeActions';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import FiltersCollaborater from '../common/filtersCollaborater';
import { useNavigate } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import { useState } from 'react';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "react-bootstrap";
import { addCurrentCollaborater } from '../../../redux/reducers/home/homeActions';
import ShowModalEquipmentsCollaborater from './showModalEquipmentsCollaborater';
import getFonctions from '../../../redux/reducers/common/commonActions';

function RenderHome(props) {
    const HomeState = props.HomeState;

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState();
    const [isOpenedShowModal, setIsOpenedShowModal] = useState(false);

    useEffect(() => {
        const getAllCollaboraters = async () => {
            let response = await getCollaboraters();
    
            //Si non authorisé par l'API on redirige sur le login
            if(response.status === 401)
            {
                navigate("./Logout");
            }
            else if(response.status !== 200)
            {
                setErrorMessage(response.message);
            }
        };

        getAllCollaboraters();
        getFonctions();
    }, [navigate])

    const onClickSvg = (event, collaborateur) => {
        event.preventDefault();

        //On stock le collaborateur pour l'utiliser dans la modale
        addCurrentCollaborater(collaborateur);

        setIsOpenedShowModal(true);
    }

    const onDoubleClickRow = (event, idCollaborateur) => {
        event.preventDefault();

        navigate("./EditCollaborater?idCollaborateur=" + idCollaborateur);
    }

    const createRows = () => {
        if(HomeState?.collaboraters?.length > 0)
        {
            return HomeState.collaboraters.map(
                (collaborateur) =>
                <tr key={uuidv4()} onDoubleClick={(event) => onDoubleClickRow(event, collaborateur.idCollaborateur)}>
                    <td>{collaborateur.nom}</td>
                    <td>{collaborateur.prenom}</td>
                    <td>{collaborateur.uname}</td>
                    <td>{collaborateur.fonction}</td>
                    <td className="align-btn">
                        <Button variant="primary" onClick={event => onClickSvg(event, collaborateur)}><FontAwesomeIcon icon={faList}/></Button>
                    </td>
                </tr>
            )
        }
    }
    
    const render = (
        <div className="home">
            <h1 className="home-title">Accueil</h1>
            <div className="card mb-5 pt-2 pb-2">
                {<FiltersCollaborater title="home" isFromHome={true} setErrorMessage={setErrorMessage}/>}
                {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
                <div className="home-tableau">
                    <h4>Liste des Collaborateurs Actifs</h4>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>E-mail</th>
                            <th>Fonction</th>
                            <th>Equipements</th>
                        </tr>
                        </thead>
                        <tbody>
                            {createRows()}
                        </tbody>
                    </Table>
                </div>
            </div>
            {isOpenedShowModal &&
                <ShowModalEquipmentsCollaborater
                    setIsOpenedShowModal={setIsOpenedShowModal}
                    isOpenedShowModal={isOpenedShowModal}
                />
            }
        </div>
    );
    
    return render;
}

const mapStateToProps = (state) => {
    return {
        HomeState: state.HomeReducer
    }
}
  
export default connect(mapStateToProps)(RenderHome);
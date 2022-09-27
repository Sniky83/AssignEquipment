import { v4 as uuidv4 } from 'uuid';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import getCollaboraters from '../../../redux/reducers/editCollaborater/editCollaboraterActions';
import { addCurrentCollaborater } from '../../../redux/reducers/editCollaborater/editCollaboraterActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import FiltersCollaborater from '../common/filtersCollaborater';
import CreateModalCollaborater from './createModalCollaborater';
import EditModalCollaborater from './editModalCollaborater';
import DeleteModalCollaborater from './deleteModalCollaborater';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { UpdateCollaborater } from '../../../services/editCollaborater/editCollaboraterService';
import { Button } from 'react-bootstrap';
import getFonctions from "../../../redux/reducers/common/commonActions";
import { GetCollaborater } from '../../../services/editCollaborater/editCollaboraterService';

function RenderEditCollaborater(props) {
    const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);
    const [isOpenedEditModal, setIsOpenedEditModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();
    
    const EditCollaboraterState = props.EditCollaboraterState;

    useEffect(() => {
        const getSingleCollaborater = async () => {
            const queryString = window.location.search;
            const urlParam = new URLSearchParams(queryString);
            const valueParam = parseInt(urlParam.get('idCollaborateur'));
    
            //Si y'a un param dans l'url on focus
            if(Number.isInteger(valueParam) && valueParam > 0)
            {
                let response = await GetCollaborater(valueParam);
                
                //Si non authorisé par l'API on redirige sur le login
                if(response.status === 401)
                {
                    navigate("./Logout");
                }
                else if(response.status !== 200)
                {
                    setErrorMessage(response.message);
                }

                return true;
            }
            return false;
        }

        const getAllCollaboraters = async () => {
            const isSingle = await getSingleCollaborater();

            if(isSingle)
            {
                return -1;
            }

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

    const onClickSvg = (event, collaborateur, whichClicked) => {
        event.preventDefault();

        //State pour récupérer le collaborateur de la ligne en cours
        //Utile pour l'édition du collaborateur en question
        //Aussi pour la supression
        //Inutile pour la création d'un collaborateur
        addCurrentCollaborater(collaborateur);

        if(whichClicked === "EDIT")
        {
            setIsOpenedEditModal(true);
        }
        else
        {
            setIsOpenedDeleteModal(true);
        }
    }

    const onChangeIsActif = async (event, collaborateur) => {
        event.preventDefault();
        
        await UpdateCollaborater(collaborateur.idCollaborateur, collaborateur);

        //On rafraichie les éléments vu qu'un vient d'être UPDATE
        await getCollaboraters();
    }

    const onDoubleClickRow = (event, collaborateur) => {
        event.preventDefault();

        addCurrentCollaborater(collaborateur);

        setIsOpenedEditModal(true);
    }

    const createRows = () => {
        if(EditCollaboraterState.collaboraters.length > 0)
        {
            return EditCollaboraterState.collaboraters.map(
                (collaborateur) =>
                <tr key={uuidv4()} onDoubleClick={(event) => onDoubleClickRow(event, collaborateur)}>
                    <td>{collaborateur.nom}</td>
                    <td>{collaborateur.prenom}</td>
                    <td>{collaborateur.uname}</td>
                    <td>{collaborateur.fonction}</td>
                    <td className="text-center">
                        <input type="checkbox" className="form-check-input" onChange={event => onChangeIsActif(event, collaborateur)} checked={collaborateur.isActif}/>
                    </td>
                    <td className="align-btn">
                        <Button variant="primary" onClick={event => onClickSvg(event, collaborateur, "EDIT")}><FontAwesomeIcon icon={faPenToSquare}/></Button>
                        <Button variant="primary" onClick={event => onClickSvg(event, collaborateur, "DELETE")}><FontAwesomeIcon icon={faTrashCan}/></Button>
                    </td>
                </tr>
            );
        }
    }

    const render = (
        <div className="edit-collaborater">
            <h1 className="edit-collaborateur-title">Gestion des collaborateurs</h1>
            <div className="card mb-5 pt-2 pb-2">
                <CreateModalCollaborater />
                <FiltersCollaborater title="edit-collaborater" isFromHome={false} setErrorMessage={setErrorMessage}/>

                {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
                <div className="home-tableau">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>E-mail</th>
                            <th>Fonction</th>
                            <th>Actif ?</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {createRows()}
                        </tbody>
                    </Table>
                </div>
            </div>
            {isOpenedDeleteModal &&
                <DeleteModalCollaborater
                    setIsOpenedDeleteModal={setIsOpenedDeleteModal}
                    isOpenedDeleteModal={isOpenedDeleteModal}
                />
            }
            
            {isOpenedEditModal &&
                <EditModalCollaborater
                    setIsOpenedEditModal={setIsOpenedEditModal}
                    isOpenedEditModal={isOpenedEditModal}
                />
            }
      </div>
    );

    return render;
}

const mapStateToProps = (state) => {
    return {
        LoginState: state.LoginReducer,
        EditCollaboraterState: state.EditCollaboraterReducer
    }
}
  
export default connect(mapStateToProps)(RenderEditCollaborater);
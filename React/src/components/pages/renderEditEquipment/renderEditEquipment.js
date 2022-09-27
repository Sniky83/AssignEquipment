import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import getEquipments from "../../../redux/reducers/editEquipment/editEquipmentActions";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { addCurrentEquipment } from "../../../redux/reducers/editEquipment/editEquipmentActions";
import { Alert } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import FiltersEditEquipment from "../renderEditEquipment/filtersEditEquipment";
import CreateModalEquipment from "./createModalEquipment";
import EditModalEquipment from "./editModalEquipment";
import DeleteModalEquipment from "./deleteModalEquipment";
import getEquipmentTypes from "../../../redux/reducers/editEquipmentType/editEquipmentTypeActions";
import { Button } from "react-bootstrap";
import { GetEquipment } from "../../../services/editEquipment/editEquipmentService";

function RenderEditEquipment(props) {
    const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);
    const [isOpenedEditModal, setIsOpenedEditModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    const EditEquipmentState = props.EditEquipmentState;

    useEffect(() => {
        const getSingleEquipment = async () => {
            const queryString = window.location.search;
            const urlParam = new URLSearchParams(queryString);
            const valueParam = parseInt(urlParam.get('idEquipement'));
    
            //Si y'a un param dans l'url on focus
            if(Number.isInteger(valueParam) && valueParam > 0)
            {
                let response = await GetEquipment(valueParam);
                
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

        const getAllEquipments = async () => {
            const isSingle = await getSingleEquipment();

            if(isSingle)
            {
                return -1;
            }

            let response = await getEquipments();
    
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

        getAllEquipments();
        getEquipmentTypes();
    }, [navigate])

    const onClickSvg = (event, equipment, whichClicked) => {
        event.preventDefault();

        //State pour récupérer l'equipment type de la ligne en cours
        //Utile pour l'édition de l'equipment type en question
        //Aussi pour la supression
        //Inutile pour la création d'un equipment type
        addCurrentEquipment(equipment);

        if(whichClicked === "EDIT")
        {
            setIsOpenedEditModal(true);
        }
        else
        {
            setIsOpenedDeleteModal(true);
        }
    }

    const onDoubleClickRow = (event, equipment) => {
        event.preventDefault();

        addCurrentEquipment(equipment);

        setIsOpenedEditModal(true);
    }

    const createRows = () => {
        if(EditEquipmentState.equipments.length > 0)
        {
            return EditEquipmentState.equipments.map(
                (equipment) =>
                <tr key={uuidv4()} onDoubleClick={(event) => onDoubleClickRow(event, equipment)}>
                    <td>{equipment.libelle}</td>
                    <td>{equipment.marque}</td>
                    <td>{equipment.modele}</td>
                    <td>{equipment.numeroSerie}</td>
                    <td>{equipment.commentaire}</td>
                    <td>{new Intl.DateTimeFormat('fr-FR').format(new Date(equipment.dateCreation))}</td>
                    <td className="align-btn">
                        <Button variant="primary" onClick={event => onClickSvg(event, equipment, "EDIT")}><FontAwesomeIcon icon={faPenToSquare}/></Button>
                        <Button variant="primary" onClick={event => onClickSvg(event, equipment, "DELETE")}><FontAwesomeIcon icon={faTrashCan}/></Button>
                    </td>
                </tr>
            );
        }
    }

    const render = (
        <div className="edit-equipment">
            <h1 className="edit-equipment-title">Gestion des équipements</h1>
            <div className="card mb-5 pt-2 pb-2">
                <CreateModalEquipment />
                <FiltersEditEquipment setErrorMessage={setErrorMessage}/>
                {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
                <div className="edit-equipment-tableau">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Type</th>
                            <th>Marque</th>
                            <th>Modele</th>
                            <th>Numero de série</th>
                            <th>Commentaire</th>
                            <th>Date de création</th>
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
                <DeleteModalEquipment
                    setIsOpenedDeleteModal={setIsOpenedDeleteModal}
                    isOpenedDeleteModal={isOpenedDeleteModal}
                />
            }
            
            {isOpenedEditModal &&
                <EditModalEquipment
                    setIsOpenedEditModal={setIsOpenedEditModal}
                    isOpenedEditModal={isOpenedEditModal}
                />
            }
        </div>
    );

    return (
        <>
            {render}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        EditEquipmentState: state.EditEquipmentReducer
    }
}
  
export default connect(mapStateToProps)(RenderEditEquipment);
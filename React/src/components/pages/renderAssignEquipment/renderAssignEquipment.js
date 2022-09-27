import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import FiltersAssignEquipment from "../renderAssignEquipment/filtersAssignEquipment";
import getAssignEquipments from "../../../redux/reducers/assignEquipment/assignEquipmentActions";
import { addCurrentAssignEquipment } from "../../../redux/reducers/assignEquipment/assignEquipmentActions";
import CreateModalAssignEquipment from "./createModalAssignEquipment";
import EditModalAssignEquipment from "./editModalAssignEquipment";
import getCollaboraters from "../../../redux/reducers/editCollaborater/editCollaboraterActions"
import DeleteModalAssignEquipment from "./deleteModalAssignEquipment";
import { Button } from "react-bootstrap";

function RenderAssignEquipment(props) {
    const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);
    const [isOpenedEditModal, setIsOpenedEditModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    const AssignEquipmentState = props.AssignEquipmentState;

    useEffect(() => {
        const getAllAssignEquipments = async () => {
            let response = await getAssignEquipments();
    
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

        getAllAssignEquipments();

        //On alimente le réduceur pour le SELECT
        getCollaboraters();
    }, [navigate])

    const onClickSvg = (event, assignEquipment, whichClicked) => {
        event.preventDefault();
        
        assignEquipment.oldIdEquipement = assignEquipment.idEquipement;
        addCurrentAssignEquipment(assignEquipment);

        if(whichClicked === "EDIT")
        {
            setIsOpenedEditModal(true);
        }
        else
        {
            setIsOpenedDeleteModal(true);
        }
    }

    const onDoubleClickRow = (event, assignEquipment) => {
        event.preventDefault();

        addCurrentAssignEquipment(assignEquipment);

        setIsOpenedEditModal(true);
    }

    const createRows = () => {
        if(AssignEquipmentState.assignEquipments.length > 0)
        {
            return AssignEquipmentState.assignEquipments.map(
                (assignEquipment) =>
                <tr key={uuidv4()} onDoubleClick={(event) => onDoubleClickRow(event, assignEquipment)}>
                    <td>{assignEquipment.nom}</td>
                    <td>{assignEquipment.prenom}</td>
                    <td>{assignEquipment.libelle}</td>
                    <td>{assignEquipment.marque}</td>
                    <td>{assignEquipment.modele}</td>
                    <td>{assignEquipment.numeroSerie}</td>
                    <td>{new Intl.DateTimeFormat('fr-FR').format(new Date(assignEquipment.dateCreation))}</td>
                    <td className="align-btn">
                        <Button variant="primary" onClick={event => onClickSvg(event, assignEquipment, "EDIT")}><FontAwesomeIcon icon={faPenToSquare}/></Button>
                        <Button variant="primary" onClick={event => onClickSvg(event, assignEquipment, "DELETE")}><FontAwesomeIcon icon={faTrashCan}/></Button>
                    </td>
                </tr>
            );
        }
    }

    const render = (
        <div className="assign-equipment">
            <h1 className="assign-equipment-title">Affectation des équipements</h1>
            <div className="card mb-5 pt-2 pb-2">
                <CreateModalAssignEquipment />
                <FiltersAssignEquipment setErrorMessage={setErrorMessage}/>
                {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
                <div className="edit-equipment-tableau">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Type</th>
                            <th>Marque</th>
                            <th>Modele</th>
                            <th>Numero de série</th>
                            <th>Date de l'affectation</th>
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
                <DeleteModalAssignEquipment
                    setIsOpenedDeleteModal={setIsOpenedDeleteModal}
                    isOpenedDeleteModal={isOpenedDeleteModal}
                />
            }
            
            {isOpenedEditModal &&
                <EditModalAssignEquipment
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
        AssignEquipmentState: state.AssignEquipmentReducer
    }
}

export default connect(mapStateToProps)(RenderAssignEquipment);
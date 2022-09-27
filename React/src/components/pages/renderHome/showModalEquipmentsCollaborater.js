import GenericModal from "../../modal/modal";
import GetEquipmentsCollaborater from "../../../services/home/homeService";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ShowModalEquipmentsCollaborater(props) {
    const currentCollaborater = props.HomeState.currentCollaborater;
    const [response, setResponse] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const getAllEquipmentsCollaborater = async () => {
            if(currentCollaborater?.idCollaborateur)
            {
                const result = await GetEquipmentsCollaborater(currentCollaborater?.idCollaborateur);
                setResponse(result);
            }
        };

        getAllEquipmentsCollaborater();
        // eslint-disable-next-line
    }, [])

    const onCloseModal = () => {
        props.setIsOpenedShowModal(false);
    }

    const onClickSave = async (event) => {
        event.preventDefault();

        props.setIsOpenedShowModal(false);
    }

    const onDoubleClickRow = (event, idEquipement) => {
        event.preventDefault();

        navigate("./EditEquipment?idEquipement=" + idEquipement);
    }

    const createRows = () => {
        if(response?.data?.length > 0)
        {
            return response.data.map(
                (equipement) =>
                <tr key={uuidv4()} onDoubleClick={(event) => onDoubleClickRow(event, equipement.idEquipement)}>
                    <td>{equipement.libelle}</td>
                    <td>{equipement.marque}</td>
                    <td>{equipement.modele}</td>
                    <td>{equipement.numeroSerie}</td>
                    <td>{equipement.commentaire}</td>
                    <td>{new Intl.DateTimeFormat('fr-FR').format(new Date(equipement.dateCreation))}</td>
                </tr>
            )
        }
    }

    const modalBodyShow = (
        <div className="home">
            {response?.message && <Alert variant="warning">{response.message}</Alert>}
            <div className="home-equipements-tableau">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Type</th>
                        <th>Marque</th>
                        <th>Modele</th>
                        <th>Numero de série</th>
                        <th>Commentaire</th>
                        <th>Date de création</th>
                    </tr>
                    </thead>
                    <tbody>
                        {createRows()}
                    </tbody>
                </Table>
            </div>
        </div>
    );

    return (
        <GenericModal
            title={"Liste des équipements de " + currentCollaborater.nom + " " + currentCollaborater.prenom}
            txtClose="Annuler"
            txtSave="OK"
            body={modalBodyShow}
            onClickSave={event => onClickSave(event)}
            onClose={onCloseModal}
            isOpened={props.isOpenedShowModal}
            class="modal-lg"
        />
    );
}

const mapStateToProps = (state) => {
    return {
        HomeState: state.HomeReducer
    }
}
  
export default connect(mapStateToProps)(ShowModalEquipmentsCollaborater);
import { Form } from "react-bootstrap";
import { useState } from "react";
import GenericModal from "../../modal/modal";
import { connect } from "react-redux";
import { DeleteEquipment } from "../../../services/editEquipment/editEquipmentService";
import getEquipments from "../../../redux/reducers/editEquipment/editEquipmentActions";
import Swal from "sweetalert2";

function DeleteModalEquipment(props) {
    const [dataModal, setDataModal] = useState();

    const currentEquipment = props.EditEquipmentState.currentEquipment;

    const onCloseModal = () => {
        props.setIsOpenedDeleteModal(false);
    }

    const onClickSave = async (event) => {
        event.preventDefault();
        
        let response = await DeleteEquipment(currentEquipment?.idEquipement);

        if(response.status === 200)
        {
            props.setIsOpenedDeleteModal(false);

            //On charge les data si succès
            getEquipments();
        }
        else if(response.status === 409)
        {
            //Si l'équipement est lié a un collaborateur
            //On ne supprime pas l'équipement, on prévient l'utilisateur
            Swal.fire({
                title: 'Supression impossible',
                html: response.message,
                icon: 'warning',
                confirmButtonText: 'OK'
            });

            //On passe le status a 200 pour ne pas afficher le message d'erreur dans la modale
            response.status = 200;

            props.setIsOpenedDeleteModal(false);
        }
        else
        {
            props.setIsOpenedDeleteModal(true);
        }

        setDataModal(response);
    }

    const modalBodyDelete = (
        <Form id="delete">
            <Form.Group className="mb-3" controlId="formEquipment">
                <Form.Label>Voulez-vous vraiment supprimer l'équipement : <b>{currentEquipment?.marque + " " + currentEquipment?.modele}</b> ?</Form.Label>
            </Form.Group>
        </Form>
    );

    return (
        <GenericModal
            title="Suppression d'un équipement"
            txtClose="Non"
            txtSave="Oui"
            body={modalBodyDelete}
            onClickSave={event => onClickSave(event)}
            onClose={onCloseModal}
            isOpened={props.isOpenedDeleteModal}
            data={dataModal}
        />
    );
}

const mapStateToProps = (state) => {
    return {
        EditEquipmentState: state.EditEquipmentReducer
    }
}
  
export default connect(mapStateToProps)(DeleteModalEquipment);
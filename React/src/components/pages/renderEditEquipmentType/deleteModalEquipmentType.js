import { Form } from "react-bootstrap";
import { useState } from "react";
import GenericModal from "../../modal/modal";
import { connect } from "react-redux";
import { DeleteEquipmentType } from "../../../services/editEquipmentType/editEquipmentTypeService";
import getEquipmentTypes from "../../../redux/reducers/editEquipmentType/editEquipmentTypeActions";
import Swal from "sweetalert2";

function DeleteModalEquipmentType(props) {
    const [dataModal, setDataModal] = useState();

    const currentEquipmentType = props.EditEquipmentTypeState.currentEquipmentType;

    const onCloseModal = () => {
        props.setIsOpenedDeleteModal(false);
    }

    const onClickSave = async (event) => {
        event.preventDefault();
        
        let response = await DeleteEquipmentType(currentEquipmentType?.idTypeEquipement);

        if(response.status === 200)
        {
            props.setIsOpenedDeleteModal(false);

            //On charge les data si succès
            getEquipmentTypes();
        }
        else if(response.status === 409)
        {
            //Si le collaborateur possède des affectaitons
            //On ne supprime pas le collab', on prévient l'utilisateur
            Swal.fire({
                title: 'Supression impossible',
                text: response.message,
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
            <Form.Group className="mb-3" controlId="formLibelle">
                <Form.Label>Voulez-vous vraiment supprimer : <b>{currentEquipmentType?.libelle}</b> ?</Form.Label>
            </Form.Group>
        </Form>
    );

    return (
        <GenericModal
            title="Suppression d'un type équipement"
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
        EditEquipmentTypeState: state.EditEquipmentTypeReducer
    }
}
  
export default connect(mapStateToProps)(DeleteModalEquipmentType);
import { Form } from "react-bootstrap";
import { useState } from "react";
import { DeleteCollaborater } from "../../../services/editCollaborater/editCollaboraterService";
import getCollaboraters from "../../../redux/reducers/editCollaborater/editCollaboraterActions";
import GenericModal from "../../modal/modal";
import { connect } from "react-redux";
import Swal from "sweetalert2";

function DeleteModalCollaborater(props) {
    const [dataModal, setDataModal] = useState();

    const currentCollaborater = props.EditCollaboraterState.currentCollaborater;

    const onCloseModal = () => {
        props.setIsOpenedDeleteModal(false);
    }

    const onClickSave = async (event) => {
        event.preventDefault();
        
        let response = await DeleteCollaborater(currentCollaborater?.idCollaborateur);

        if(response.status === 200)
        {
            props.setIsOpenedDeleteModal(false);

            //On charge les data si succès
            getCollaboraters();
        }
        else if(response.status === 409)
        {
            //Si on le type équipement est lié a un équipement
            //On ne supprime pas son type, on prévient l'utilisateur
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
            <Form.Group className="mb-3" controlId="formCollaborater">
                <Form.Label>Voulez-vous vraiment supprimer : <b>{currentCollaborater?.nom + " " + currentCollaborater?.prenom}</b> ?</Form.Label>
            </Form.Group>
        </Form>
    );

    return (
        <GenericModal
            title="Suppression d'un collaborateur"
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
        EditCollaboraterState: state.EditCollaboraterReducer
    }
}
  
export default connect(mapStateToProps)(DeleteModalCollaborater);
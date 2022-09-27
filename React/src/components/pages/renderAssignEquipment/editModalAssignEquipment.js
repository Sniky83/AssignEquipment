import { Form } from "react-bootstrap";
import { useState } from "react";
import GenericModal from "../../modal/modal";
import { connect } from "react-redux";
import { addCurrentAssignEquipment } from "../../../redux/reducers/assignEquipment/assignEquipmentActions";
import getAssignEquipments from "../../../redux/reducers/assignEquipment/assignEquipmentActions";
import GetCollaboratersAssignEquipment from "./getCollaboratersAssignEquipment";
import GetEquipmentsAssignEquipment from "./getEquipmentsAssignEquipment";
import { UpdateAssignEquipment } from "../../../services/assignEquipment/assignEquipmentService";
import GetCurrentEquipment from "./getCurrentEquipment";

function EditModalAssignEquipment(props) {    
    const [dataModal, setDataModal] = useState();

    const currentAssignEquipment = props.AssignEquipmentState.currentAssignEquipment;

    const onCloseModal = () => {
        props.setIsOpenedEditModal(false);
    }

    const onClickSave = async (event) => {
        event.preventDefault();

        let response = await UpdateAssignEquipment(currentAssignEquipment?.oldIdEquipement);

        //Si ça à fonctionné
        if(response.status === 200)
        {
            props.setIsOpenedEditModal(false);

            //On charge les data si succès
            getAssignEquipments();
        }
        else
        {
            props.setIsOpenedEditModal(true);
        }

        setDataModal(response);

        let idEquipement = parseInt(document.forms.edit?.idEquipement.value);
        let idCollaborateur = parseInt(document.forms.edit?.idCollaborateur.value);

        //On remplie les id du current pour mettre à jour
        currentAssignEquipment.idEquipement = idEquipement;
        currentAssignEquipment.idCollaborateur = idCollaborateur;

        addCurrentAssignEquipment(currentAssignEquipment);
    }

    const modalBodyEdit = (
        <Form id="edit">
            <GetCollaboratersAssignEquipment locked/>
            <GetCurrentEquipment />
            <GetEquipmentsAssignEquipment />
        </Form>
    )

    return (
        <GenericModal
            title="Modification d'une affectation d'équipement"
            txtClose="Fermer"
            txtSave="Enregistrer"
            body={modalBodyEdit}
            onClickSave={event => onClickSave(event)}
            onClose={onCloseModal}
            isOpened={props.isOpenedEditModal}
            data={dataModal}
        />
    );
}

const mapStateToProps = (state) => {
    return {
        AssignEquipmentState: state.AssignEquipmentReducer
    }
}

export default connect(mapStateToProps)(EditModalAssignEquipment);
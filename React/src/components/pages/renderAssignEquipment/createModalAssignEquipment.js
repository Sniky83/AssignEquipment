import { useState } from "react";
import { Form } from "react-bootstrap";
import GenericModal from "../../modal/modal";
import { connect } from "react-redux";
import { addCurrentAssignEquipment } from "../../../redux/reducers/assignEquipment/assignEquipmentActions";
import getAssignEquipments from "../../../redux/reducers/assignEquipment/assignEquipmentActions";
import GetEquipmentsAssignEquipment from "./getEquipmentsAssignEquipment";
import GetCollaboratersAssignEquipment from "./getCollaboratersAssignEquipment";
import CreateAssignEquipment from "../../../services/assignEquipment/assignEquipmentService";

function CreateModalAssignEquipment(props) {
    const [isOpenedModal, setIsOpenedModal] = useState(false);
    const [dataModal, setDataModal] = useState();

    const currentAssignEquipment = props.AssignEquipmentState.currentAssignEquipment;

    const onOpenModal = () => {
        setIsOpenedModal(true);

        //Permet de remettre l'affectation d'équipement sur l'élément par défaut
        addCurrentAssignEquipment({idEquipement: 0, idCollaborateur: 0});
    }

    const onCloseModal = () => {
        setIsOpenedModal(false);
    }

    const onClickSave = async (event) => {
        event.preventDefault();

        let response = await CreateAssignEquipment();

        //Si ça a fonctionné
        if(response.status === 200)
        {
            setIsOpenedModal(false);

            //On recharge une fois save pour avoir la liste à jour.
            getAssignEquipments();
        }
        else
        {
            setIsOpenedModal(true);
        }

        let idEquipement = parseInt(document.forms.create?.idEquipement.value);
        let idCollaborateur = parseInt(document.forms.create?.idCollaborateur.value);

        currentAssignEquipment.idEquipement = idEquipement;
        currentAssignEquipment.idCollaborateur = idCollaborateur;

        addCurrentAssignEquipment(currentAssignEquipment);

        setDataModal(response);
    }

    const modalBodyCreate = (
        <Form id="create">
            <GetCollaboratersAssignEquipment />
            <GetEquipmentsAssignEquipment />
        </Form>
    );

    return (
        <GenericModal
            txtBtnOpenModal="Affecter un équipement"
            title="Affectation d'un équipement"
            txtClose="Fermer"
            txtSave="Enregistrer"
            body={modalBodyCreate}
            onOpen={onOpenModal}
            onClickSave={event => onClickSave(event)}
            onClose={onCloseModal}
            isOpened={isOpenedModal}
            data={dataModal}
        />
    );
}

const mapStateToProps = (state) => {
    return {
        AssignEquipmentState: state.AssignEquipmentReducer
    }
}

export default connect(mapStateToProps)(CreateModalAssignEquipment);
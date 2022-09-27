import { Form } from "react-bootstrap";
import { useState } from "react";
import GenericModal from "../../modal/modal";
import { connect } from "react-redux";
import { DeleteAssignEquipment } from "../../../services/assignEquipment/assignEquipmentService";
import getAssignEquipments from "../../../redux/reducers/assignEquipment/assignEquipmentActions";

function DeleteModalAffectationEquipment(props) {
    const [dataModal, setDataModal] = useState();

    const currentAssignEquipment = props.AssignEquipmentState.currentAssignEquipment;

    const onCloseModal = () => {
        props.setIsOpenedDeleteModal(false);
    }

    const onClickSave = async (event) => {
        event.preventDefault();
        
        let response = await DeleteAssignEquipment(currentAssignEquipment?.idAffectationEquipement);

        if(response.status === 200)
        {
            props.setIsOpenedDeleteModal(false);

            //On charge les data si succès
            getAssignEquipments();
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
                <Form.Label>
                    Voulez-vous vraiment supprimer l'affectation à : <br/>
                    <b>{currentAssignEquipment?.nom} {currentAssignEquipment?.prenom}</b><br/>
                    Concernant l'équipement : <br/>
                    <b>{currentAssignEquipment.libelle} - {currentAssignEquipment.marque} - {currentAssignEquipment.modele} - {currentAssignEquipment.numeroSerie}</b> ?
                </Form.Label>
            </Form.Group>
        </Form>
    );

    return (
        <GenericModal
            title="Suppression d'une affectation d'équipement"
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
        AssignEquipmentState: state.AssignEquipmentReducer
    }
}

export default connect(mapStateToProps)(DeleteModalAffectationEquipment);
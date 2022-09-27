import { Form } from "react-bootstrap";
import { useState } from "react";
import GenericModal from "../../modal/modal";
import { connect } from "react-redux";
import getEquipmentTypes, { addCurrentEquipmentType } from "../../../redux/reducers/editEquipmentType/editEquipmentTypeActions";
import { UpdateEquipmentType } from "../../../services/editEquipmentType/editEquipmentTypeService";

function EditModalEquipmentType(props) {
    const [dataModal, setDataModal] = useState();

    const currentEquipmentType = props.EditEquipmentTypeState.currentEquipmentType;

    const onCloseModal = () => {
        props.setIsOpenedEditModal(false);
    }

    const onClickSave = async (event) => {
        event.preventDefault();
        
        let response = await UpdateEquipmentType(currentEquipmentType?.idTypeEquipement);

        //Si ça à fonctionné
        if(response.status === 200)
        {
            props.setIsOpenedEditModal(false);
    
            //On charge les data si succès
            getEquipmentTypes();
        }
        else
        {
            props.setIsOpenedEditModal(true);
        }

        setDataModal(response);

        addCurrentEquipmentType(currentEquipmentType);
    }

    const modalBodyEdit = (
        <Form id="edit">
            <Form.Group className="mb-3" controlId="formLibelle">
                <Form.Label>Libelle</Form.Label>
                <Form.Control type="text" placeholder="Souris" name="libelle" defaultValue={currentEquipmentType?.libelle} maxLength="25" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIsActif">
                <Form.Check type="checkbox" className="mb-10" label="Actif ?" name="isActif" defaultChecked={currentEquipmentType?.isActif}/>
            </Form.Group>
        </Form>
    );

    return (
        <GenericModal
            title="Modification d'un type équipement"
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
        EditEquipmentTypeState: state.EditEquipmentTypeReducer
    }
}
  
export default connect(mapStateToProps)(EditModalEquipmentType);
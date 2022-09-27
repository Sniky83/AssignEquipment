import { Form } from "react-bootstrap";
import { useState } from "react";
import GenericModal from "../../modal/modal";
import { connect } from "react-redux";
import getEquipments, { addCurrentEquipment } from "../../../redux/reducers/editEquipment/editEquipmentActions";
import { UpdateEquipment } from "../../../services/editEquipment/editEquipmentService";
import GetEquipmentTypesEquipment from "./getEquipmentTypesEquipment";

function EditModalEquipment(props) {
    const [dataModal, setDataModal] = useState();

    const currentEquipment = props.EditEquipmentState.currentEquipment;

    const onCloseModal = () => {
        props.setIsOpenedEditModal(false);
    }

    const onClickSave = async (event) => {
        event.preventDefault();
        
        let response = await UpdateEquipment(currentEquipment?.idEquipement);

        //Si ça à fonctionné
        if(response.status === 200)
        {
            props.setIsOpenedEditModal(false);

            //On charge les data si succès
            getEquipments();
        }
        else
        {
            props.setIsOpenedEditModal(true);
        }

        setDataModal(response);

        let idTypeEquipement = parseInt(document.forms.edit?.idTypeEquipement.value);

        currentEquipment.idTypeEquipement = idTypeEquipement;
    
        addCurrentEquipment(currentEquipment);
    }

    const modalBodyEdit = (
        <Form id="edit">
            <Form.Group className="mb-3" controlId="formMarque">
                <Form.Label>Marque</Form.Label>
                <Form.Control type="text" placeholder="Razer" name="marque" defaultValue={currentEquipment?.marque} maxLength="25" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formModele">
                <Form.Label>Modele</Form.Label>
                <Form.Control type="text" placeholder="Deathadder Chroma" name="modele" defaultValue={currentEquipment?.modele} maxLength="25" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNumeroSerie">
                <Form.Label>Numéro de série</Form.Label>
                <Form.Control type="text" placeholder="X106-ZA56" name="numeroSerie" defaultValue={currentEquipment?.numeroSerie} maxLength="50" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCommentaire">
                <Form.Label>Commentaire</Form.Label>
                <Form.Control type="text" placeholder="Bord de la souris usé ..." name="commentaire" defaultValue={currentEquipment?.commentaire} maxLength="255" />
                
                <Form.Text>
                    Facultatif
                </Form.Text>
            </Form.Group>

            <GetEquipmentTypesEquipment />
        </Form>
    );

    return (
        <GenericModal
            title="Modification d'un équipement"
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
        EditEquipmentState: state.EditEquipmentReducer
    }
}
  
export default connect(mapStateToProps)(EditModalEquipment);
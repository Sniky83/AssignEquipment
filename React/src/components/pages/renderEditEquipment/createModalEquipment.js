import { useState } from "react";
import { Form } from "react-bootstrap";
import CreateEquipment from "../../../services/editEquipment/editEquipmentService";
import GenericModal from "../../modal/modal";
import GetEquipmentTypesEquipment from "./getEquipmentTypesEquipment";
import { addCurrentEquipment } from "../../../redux/reducers/editEquipment/editEquipmentActions";
import { connect } from "react-redux";
import getEquipments from "../../../redux/reducers/editEquipment/editEquipmentActions";

function CreateModalEquipment(props) {
    const [isOpenedModal, setIsOpenedModal] = useState(false);
    const [dataModal, setDataModal] = useState();

    const currentEquipment = props.EditEquipmentState.currentEquipment;

    const onOpenModal = () => {
        setIsOpenedModal(true);

        //Permet de remettre le type équipement sur l'élément par défaut
        addCurrentEquipment({idTypeEquipement: 0});
    }

    const onCloseModal = () => {
        setIsOpenedModal(false);
    }

    const onClickSave = async (event) => {
        event.preventDefault();

        let response = await CreateEquipment();

        //Si ça a fonctionné
        if(response.status === 200)
        {
            setIsOpenedModal(false);

            //On recharge les data si succès
            getEquipments();
        }
        else
        {
            setIsOpenedModal(true);
        }

        setDataModal(response);

        let idTypeEquipement = parseInt(document.forms.create?.idTypeEquipement.value);

        currentEquipment.idTypeEquipement = idTypeEquipement;
    
        addCurrentEquipment(currentEquipment);
    }

    const modalBodyCreate = (
        <Form id="create">
            <Form.Group className="mb-3" controlId="formMarque">
                <Form.Label>Marque</Form.Label>
                <Form.Control type="text" placeholder="Razer" name="marque" maxLength="25" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formModele">
                <Form.Label>Modele</Form.Label>
                <Form.Control type="text" placeholder="Deathadder Chroma" name="modele" maxLength="25" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNumeroSerie">
                <Form.Label>Numéro de série</Form.Label>
                <Form.Control type="text" placeholder="X106-ZA56" name="numeroSerie" maxLength="50" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCommentaire">
                <Form.Label>Commentaire</Form.Label>
                <Form.Control type="text" placeholder="Bord de la souris usé ..." name="commentaire" maxLength="255" />
                
                <Form.Text>
                    Facultatif
                </Form.Text>
            </Form.Group>

            <GetEquipmentTypesEquipment />
        </Form>
    );

    return (
        <GenericModal
            txtBtnOpenModal="Créer un nouvel équipement"
            title="Création d'un nouvel équipement"
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
        EditEquipmentState: state.EditEquipmentReducer
    }
}
  
export default connect(mapStateToProps)(CreateModalEquipment);
import { useState } from "react";
import { Form } from "react-bootstrap";
import CreateEquipmentType from "../../../services/editEquipmentType/editEquipmentTypeService";
import GenericModal from "../../modal/modal";
import getEquipmentTypes from "../../../redux/reducers/editEquipmentType/editEquipmentTypeActions";

export default function CreateModalEquipmentType() {
    const [isOpenedModal, setIsOpenedModal] = useState(false);
    const [dataModal, setDataModal] = useState();

    const onOpenModal = () => {
        setIsOpenedModal(true);
    }

    const onCloseModal = () => {
        setIsOpenedModal(false);
    }

    const onClickSave = async (event) => {
        event.preventDefault();

        let response = await CreateEquipmentType();

        //Si ça a fonctionné
        if(response.status === 200)
        {
            setIsOpenedModal(false);

            //On charge les data si succès
            getEquipmentTypes();
        }
        else
        {
            setIsOpenedModal(true);
        }

        setDataModal(response);
    }

    const modalBodyCreate = (
        <Form id="create">
            <Form.Group className="mb-3" controlId="formLibelle">
                <Form.Label>Libellé</Form.Label>
                <Form.Control type="text" placeholder="Souris" name="libelle" maxLength="25" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIsActif">
                <Form.Check type="checkbox" className="mb-10" label="Actif ?" name="isActif" />
            </Form.Group>
        </Form>
    );

    return (
        <GenericModal
            txtBtnOpenModal="Créer un nouveau type équipement"
            title="Création d'un nouveau type équipement"
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
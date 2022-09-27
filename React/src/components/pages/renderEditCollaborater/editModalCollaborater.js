import { Form } from "react-bootstrap";
import { useState } from "react";
import { UpdateCollaborater } from "../../../services/editCollaborater/editCollaboraterService";
import getCollaboraters from "../../../redux/reducers/editCollaborater/editCollaboraterActions";
import GenericModal from "../../modal/modal";
import GetFonctionsCollaborater from "./getFonctionsCollaborater";
import { connect } from "react-redux";
import { addCurrentCollaborater } from "../../../redux/reducers/editCollaborater/editCollaboraterActions";

function EditModalCollaborater(props) {
    const [dataModal, setDataModal] = useState();

    const currentCollaborater = props.EditCollaboraterState.currentCollaborater;

    const onCloseModal = () => {
        props.setIsOpenedEditModal(false);
    }

    const onClickSave = async (event) => {
        event.preventDefault();
        
        let response = await UpdateCollaborater(currentCollaborater?.idCollaborateur);

        //Si ça à fonctionné
        if(response.status === 200)
        {
            props.setIsOpenedEditModal(false);

            //On charge les data si succès
            getCollaboraters();
        }
        else
        {
            props.setIsOpenedEditModal(true);
        }

        setDataModal(response);

        let idFonction = parseInt(document.forms.edit?.idFonction.value);

        currentCollaborater.idFonction = idFonction;

        addCurrentCollaborater(currentCollaborater);
    }

    const modalBodyEdit = (
        <Form id="edit">
            <Form.Group className="mb-3" controlId="formNom">
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" placeholder="Dupont" name="nom" defaultValue={currentCollaborater?.nom} maxLength="25" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrenom">
                <Form.Label>Prenom</Form.Label>
                <Form.Control type="text" placeholder="Jérome" name="prenom" defaultValue={currentCollaborater?.prenom} maxLength="25" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Dupont.jerome@outlook.fr" name="uname" defaultValue={currentCollaborater?.uname} maxLength="50" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPwd">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="********" name="pwd" minLength="8" maxLength="16" />

                <Form.Text>
                    Le mot de passe doit contenir entre 8 et 16 caractères.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFonction">
                <GetFonctionsCollaborater />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIsActif">
                <Form.Check type="checkbox" className="mb-10" label="Actif ?" name="isActif" defaultChecked={currentCollaborater?.isActif} />
            </Form.Group>
        </Form>
    );

    return (
        <GenericModal
            title="Modification d'un collaborateur"
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
        EditCollaboraterState: state.EditCollaboraterReducer
    }
}
  
export default connect(mapStateToProps)(EditModalCollaborater);
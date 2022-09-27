import { useState } from "react";
import { Form } from "react-bootstrap";
import CreateCollaborater from "../../../services/editCollaborater/editCollaboraterService";
import getCollaboraters, { addCurrentCollaborater } from "../../../redux/reducers/editCollaborater/editCollaboraterActions";
import GenericModal from "../../modal/modal";
import GetFonctionsCollaborater from "./getFonctionsCollaborater";
import { connect } from "react-redux";

function CreateModalCollaborater(props) {
    const [isOpenedModal, setIsOpenedModal] = useState(false);
    const [dataModal, setDataModal] = useState();

    const currentCollaborater = props.EditCollaboraterState.currentCollaborater;

    const onOpenModal = () => {
        setIsOpenedModal(true);

        //Permet de remettre la fonction sur l'élément par défaut
        addCurrentCollaborater({idFonction: 0});
    }

    const onCloseModal = () => {
        setIsOpenedModal(false);
    }

    const onClickSave = async (event) => {
        event.preventDefault();

        let response = await CreateCollaborater();

        //Si ça a fonctionné
        if(response.status === 200)
        {
            setIsOpenedModal(false);

            //On recharge une fois save pour avoir la liste à jour.
            getCollaboraters();
        }
        else
        {
            setIsOpenedModal(true);
        }

        setDataModal(response);

        let idFonction = parseInt(document.forms.create?.idFonction.value);
        
        currentCollaborater.idFonction = idFonction;

        addCurrentCollaborater(currentCollaborater);
    }

    const modalBodyCreate = (
        <Form id="create">
            <Form.Group className="mb-3" controlId="formNom">
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" placeholder="Dupont" name="nom" maxLength="25" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrenom">
                <Form.Label>Prenom</Form.Label>
                <Form.Control type="text" placeholder="Jérome" name="prenom" maxLength="25" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Dupont.jerome@outlook.fr" name="uname" maxLength="50" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPwd">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="********" name="pwd" minLength="8" maxLength="16" />

                <Form.Text>
                    Le mot de passe doit contenir entre 8 et 16 caractères.
                </Form.Text>
            </Form.Group>

            <GetFonctionsCollaborater />

            <Form.Group className="mb-3" controlId="formIsActif">
                <Form.Check type="checkbox" className="mb-10" label="Actif ?" name="isActif" />
            </Form.Group>
        </Form>
    );

    return (
        <GenericModal
            txtBtnOpenModal="Créer un nouveau collaborateur"
            title="Création d'un nouveau collaborateur"
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
        EditCollaboraterState: state.EditCollaboraterReducer
    }
}
  
export default connect(mapStateToProps)(CreateModalCollaborater);
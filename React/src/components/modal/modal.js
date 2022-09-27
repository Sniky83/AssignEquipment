import Modal from "react-bootstrap/Modal";
import { Button, Alert } from "react-bootstrap";
import { useState } from "react";

export default function GenericModal(props) {
    const [isSaved, setIsSaved] = useState(false);

    let data = props.data;

    const handleExit = () => {
        setIsSaved(false);
    }

    const handleSave = () => {
        setIsSaved(true);
    }

    //On groupe les deux fonctions en une pour pouvoir l'utiliser dans le save
    const handleGroupedSave = (event) => {
        props.onClickSave(event);
        handleSave();
    }

    const showAlert = () => {
        if(isSaved && data !== undefined)
        {
            let msg = "";
            let style = "";

            if(data.status !== 200)
            {
                style = "danger";
                msg = data.message;

                return <Alert variant={style}>{msg}</Alert>;
            }

            return;
        }
    };

    const modal = (
        <>
            {
                props.txtBtnOpenModal &&
                    <Button variant="primary" className="mt-2 col-md-3" onClick={props.onOpen}>
                        {props.txtBtnOpenModal}
                    </Button>
            }
            <Modal className={props.class} show={props.isOpened} onHide={props.onClose} onExit={handleExit}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-white">{showAlert()} {props.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        {props.txtClose}
                    </Button>
                    <Button variant="primary" onClick={event => handleGroupedSave(event)}>
                        {props.txtSave}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
  
    return (
        <>
            {modal}
        </>
    );
}
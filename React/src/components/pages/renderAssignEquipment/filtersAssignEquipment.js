import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import { GetAssignEquipmentsFilters } from "../../../services/assignEquipment/assignEquipmentService";

export default function FiltersAssignEquipment(props) {
    const onSubmit = async (event) => {
        event.preventDefault();

        const response = await GetAssignEquipmentsFilters();

        if(response.status !== 200)
        {
            props.setErrorMessage(response.message);
        }
        else
        {
            props.setErrorMessage("");
        }
    }

    const render = (
        <div className="edit-equipment-filter pb-3">
            <Form id="filter" onSubmit={event => onSubmit(event)}>
                <Form.Group className="row mb-auto mt-3">
                    <Form.Label className="col-md-1 mt-2">Mots-Clés</Form.Label>
                    <div className="col-md-3">
                        <Form.Control type="input" name="keyword" maxLength="25" placeholder="Nom, Prenom, Type, Marque, Modèle" />
                    </div>
                    <Form.Label className="col-md-2 mt-2 d-flex flex-row-reverse">Numéro de Série</Form.Label>
                    <div className="col-md-3">
                        <Form.Control type="input" name="numeroSerie" maxLength="50" placeholder="ZAF-556-B" />
                    </div>
                    <div className="col-md-1">
                        <Button type="submit" variant="primary"><FontAwesomeIcon icon={faFilter}/></Button>
                    </div>
                </Form.Group>
            </Form>
        </div>
    );

    return render;
}
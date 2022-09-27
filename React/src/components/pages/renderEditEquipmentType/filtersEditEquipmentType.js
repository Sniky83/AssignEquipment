import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import { GetEquipmentTypesFilters } from "../../../services/editEquipmentType/editEquipmentTypeService";

export default function FiltersEquipmentType(props) {
    const onSubmit = async (event) => {
        event.preventDefault();

        const response = await GetEquipmentTypesFilters();

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
        <div className="edit-equipment-type-filter pb-3">
            <Form id="filter" onSubmit={event => onSubmit(event)}>
                <Form.Group className="row mb-auto mt-3">
                    <Form.Label className="col-md-1 mt-2">Libellé</Form.Label>
                    <div className="col-md-3">
                        <Form.Control type="input" name="libelle" maxLength="25" placeholder="SOURIS, CLAVIER ..." />
                    </div>
                    <div className="col-md-1">
                        <Form.Check type="checkbox" className="mb-10 mt-2" label="Actif ?" defaultChecked name="isActif" />
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
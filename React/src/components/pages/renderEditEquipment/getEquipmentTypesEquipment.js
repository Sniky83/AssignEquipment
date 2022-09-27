import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";

function GetEquipmentTypesEquipment(props) {
    const EditEquipmentTypeState = props.EditEquipmentTypeState.equipmentTypes;
    const currentEquipment = props.EditEquipmentState.currentEquipment;

    //On filtre sur le isActif
    const equipmentTypeActif = EditEquipmentTypeState.filter(equipmentType => equipmentType.isActif);

    return (
        <Form.Group className="mb-3" controlId="formEquipmentType">
            <Form.Label>Types d'équipements</Form.Label>
            <Form.Select name="idTypeEquipement" defaultValue={currentEquipment?.idTypeEquipement}>
                <option value="0">---Veuillez sélectionner un élément---</option>
                {
                    equipmentTypeActif.length > 0 &&
                        equipmentTypeActif.map(
                            (equipmentType) =>
                                <option key={uuidv4()} value={equipmentType.idTypeEquipement}>{equipmentType.libelle}</option>
                        )
                }
            </Form.Select>
        </Form.Group>
    );
}

const mapStateToProps = (state) => {
    return {
        EditEquipmentTypeState: state.EditEquipmentTypeReducer,
        EditEquipmentState: state.EditEquipmentReducer
    }
}
  
export default connect(mapStateToProps)(GetEquipmentTypesEquipment);
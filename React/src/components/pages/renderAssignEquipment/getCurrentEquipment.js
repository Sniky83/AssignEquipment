import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";

function GetCurrentEquipment(props) {
    const currentAssignEquipment = props.AssignEquipmentState.currentAssignEquipment;

    return (
        <Form.Group className="mb-3" controlId="formCurrentEquipment">
            <Form.Label>Equipement actuel</Form.Label>
            <Form.Select name="currentIdEquipement" disabled="disabled">
                <option key={uuidv4()} value={currentAssignEquipment.oldIdEquipement}>{currentAssignEquipment.libelle} - {currentAssignEquipment.marque} - {currentAssignEquipment.modele} - {currentAssignEquipment.numeroSerie}</option>
            </Form.Select>
        </Form.Group>
    );
}

const mapStateToProps = (state) => {
    return {
        AssignEquipmentState: state.AssignEquipmentReducer
    }
}
  
export default connect(mapStateToProps)(GetCurrentEquipment);
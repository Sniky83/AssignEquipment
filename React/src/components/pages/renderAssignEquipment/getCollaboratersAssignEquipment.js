import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";

function GetCollaboratersAssignEquipment(props) {
    const EditCollaboraterState = props.EditCollaboraterState.collaboraters;
    const currentAssignEquipment = props.AssignEquipmentState.currentAssignEquipment;

    return (
        <Form.Group className="mb-3" controlId="formCollaborater">
            <Form.Label>Collaborateurs</Form.Label>
            <Form.Select name="idCollaborateur" disabled={props.locked && ''} defaultValue={currentAssignEquipment?.idCollaborateur}>
                <option value="0">---Veuillez sélectionner un élément---</option>
                {
                    EditCollaboraterState?.length > 0 &&
                        EditCollaboraterState.map(
                            (collaborater) =>
                                <option key={uuidv4()} value={collaborater.idCollaborateur}>{collaborater.nom} {collaborater.prenom}</option>
                        )
                }
            </Form.Select>
        </Form.Group>
    )
}

const mapStateToProps = (state) => {
    return {
        EditCollaboraterState: state.EditCollaboraterReducer,
        AssignEquipmentState: state.AssignEquipmentReducer
    }
}
  
export default connect(mapStateToProps)(GetCollaboratersAssignEquipment);
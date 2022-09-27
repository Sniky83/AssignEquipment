import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";
import { useState } from "react";

function GetFonctionsCollaborater(props) {
    const CommonState = props.CommonState;
    const currentCollaborater = props.EditCollaboraterState.currentCollaborater;
    const [memoriseValue, setMemoriseValue] = useState(props.filter ? "0" : currentCollaborater?.idFonction);

    const defaultValue = !props.filter ? "---Veuillez sélectionner un élément---" : "";

    return (
        <>
            <Form.Label className={props.filter ? "d-flex flex-row-reverse col-md-1 mt-2" : "col-md-1 mt-2"}>Fonction</Form.Label>
            <div className={props.filter ? "col-md-3" : "mb-3"}>
                <Form.Select name="idFonction" value={memoriseValue} onChange={e => setMemoriseValue(e.target.value)}>
                    <option value="0">{defaultValue}</option>
                    {
                        CommonState.fonctions.length > 0 &&
                            CommonState.fonctions.map(
                                (fonction) =>
                                    <option key={uuidv4()} value={fonction.idFonction}>{fonction.libelle}</option>
                            )
                    }
                </Form.Select>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        CommonState: state.CommonReducer,
        EditCollaboraterState: state.EditCollaboraterReducer
    }
}
  
export default connect(mapStateToProps)(GetFonctionsCollaborater);
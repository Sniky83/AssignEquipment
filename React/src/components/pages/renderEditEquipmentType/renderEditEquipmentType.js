import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import getEquipmentTypes from '../../../redux/reducers/editEquipmentType/editEquipmentTypeActions';
import { addCurrentEquipmentType } from '../../../redux/reducers/editEquipmentType/editEquipmentTypeActions';
import CreateModalEquipmentType from './createModalEquipmentType';
import EditModalEquipmentType from './editModalEquipmentType';
import DeleteModalEquipmentType from './deleteModalEquipmentType';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { UpdateEquipmentType } from '../../../services/editEquipmentType/editEquipmentTypeService';
import FiltersEquipmentType from './filtersEditEquipmentType';
import { Button } from 'react-bootstrap';

function RenderEditEquipmentType(props) {
    const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);
    const [isOpenedEditModal, setIsOpenedEditModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    const EditEquipmentTypeState = props.EditEquipmentTypeState;

    useEffect(() => {
        const getAllEquipmentTypes = async () => {
            let response = await getEquipmentTypes();
    
            //Si non authorisé par l'API on redirige sur le login
            if(response.status === 401)
            {
                navigate("./Logout");
            }
            else if(response.status !== 200)
            {
                setErrorMessage(response.message);
            }
        };

        getAllEquipmentTypes();
    }, [navigate])

    const onClickSvg = (event, equipmentType, whichClicked) => {
        event.preventDefault();

        //State pour récupérer l'equipment type de la ligne en cours
        //Utile pour l'édition de l'equipment type en question
        //Aussi pour la supression
        //Inutile pour la création d'un equipment type
        addCurrentEquipmentType(equipmentType);

        if(whichClicked === "EDIT")
        {
            setIsOpenedEditModal(true);
        }
        else
        {
            setIsOpenedDeleteModal(true);
        }
    }

    const onChangeIsActif = async (event, equipmentType) => {
        event.preventDefault();
        
        await UpdateEquipmentType(equipmentType.idTypeEquipement, equipmentType);

        //On rafraichie les éléments vu qu'un vient d'être UPDATE
        await getEquipmentTypes();
    }

    const onDoubleClickRow = (event, equipmentType) => {
        event.preventDefault();

        addCurrentEquipmentType(equipmentType);

        setIsOpenedEditModal(true);
    }

    const createRows = () => {
        if(EditEquipmentTypeState.equipmentTypes.length > 0)
        {
            return EditEquipmentTypeState.equipmentTypes.map(
                (equipmentType) =>
                <tr key={uuidv4()} onDoubleClick={(event) => onDoubleClickRow(event, equipmentType)}>
                    <td>{equipmentType.libelle}</td>
                    <td className="text-center"><input type="checkbox" className="form-check-input" onChange={event => onChangeIsActif(event, equipmentType)} checked={equipmentType.isActif}/></td>
                    <td className="align-btn">
                        <Button variant="primary" onClick={event => onClickSvg(event, equipmentType, "EDIT")}><FontAwesomeIcon icon={faPenToSquare}/></Button>
                        <Button variant="primary" onClick={event => onClickSvg(event, equipmentType, "DELETE")}><FontAwesomeIcon icon={faTrashCan}/></Button>
                    </td>
                </tr>
            );
        }
    }

    const render = (
        <div className="edit-equipment-type">
            <h1 className="edit-equipment-type-title">Gestion des types d'équipements</h1>
            <div className="card mb-5 pt-2 pb-2">
                <CreateModalEquipmentType />
                <FiltersEquipmentType setErrorMessage={setErrorMessage}/>
                {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
                <div className="edit-equipment-tableau">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th className="col-md-9">Libelle</th>
                            <th>Actif ?</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {createRows()}
                        </tbody>
                    </Table>
                </div>
            </div>
            {isOpenedDeleteModal &&
                <DeleteModalEquipmentType
                    setIsOpenedDeleteModal={setIsOpenedDeleteModal}
                    isOpenedDeleteModal={isOpenedDeleteModal}
                />
            }
            
            {isOpenedEditModal &&
                <EditModalEquipmentType
                    setIsOpenedEditModal={setIsOpenedEditModal}
                    isOpenedEditModal={isOpenedEditModal}
                />
            }
        </div>
    );

    return render;
}

const mapStateToProps = (state) => {
    return {
        EditEquipmentTypeState: state.EditEquipmentTypeReducer
    }
}
  
export default connect(mapStateToProps)(RenderEditEquipmentType);
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import { GetNonAssignedEquipments } from "../../../services/assignEquipment/assignEquipmentService";
import { useState } from "react";

export default function GetEquipmentsAssignEquipment() {
    const [nonAssignedEquipments, setnonAssignedEquipments] = useState();

    useEffect(() => {
        const getAllNonAssignedEquipments = async () => {
            const response = await GetNonAssignedEquipments();
            setnonAssignedEquipments(response);
        }
        getAllNonAssignedEquipments();
    }, [])

    const defaultOptionValue = (nonAssignedEquipments?.data.length > 0 ? "---Veuillez sélectionner un élément---" : "Aucun équipement disponible");

    return (
        <Form.Group className="mb-3" controlId="formEquipment">
            <Form.Label>Equipements</Form.Label>
            <Form.Select name="idEquipement">
                <option value="0">{defaultOptionValue}</option>
                {
                    nonAssignedEquipments?.status === 200 &&
                        nonAssignedEquipments.data.map(
                            (equipment) => 
                                <option key={uuidv4()} value={equipment.idEquipement}>{equipment.libelle} - {equipment.marque} - {equipment.modele} - {equipment.numeroSerie}</option>  
                        )
                }
            </Form.Select>
        </Form.Group>
    );
}
import { Navigate, Routes, Route } from 'react-router-dom';
import Home from '../../containers/home/home';
import Login from '../../containers/login/login';
import AssignEquipment from '../../containers/assignEquipment/assignEquipment';
import EditCollaborater from '../../containers/editCollaborater/editCollaborater';
import EditEquipment from '../../containers/editEquipment/editEquipment';
import EditEquipmentType from '../../containers/editEquipmentType/editEquipmentType';
import Logout from '../../containers/logout/logout';

export default function Routage() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<Navigate to="/" />} />

            <Route path="/Logout" element={<Logout/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/AssignEquipment" element={<AssignEquipment/>} />
            <Route path="/EditCollaborater" element={<EditCollaborater/>} />
            <Route path="/EditEquipment" element={<EditEquipment/>} />
            <Route path="/EditEquipmentType" element={<EditEquipmentType/>} />
        </Routes>
    );
}
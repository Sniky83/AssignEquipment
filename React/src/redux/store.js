import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import HomeReducer from './reducers/home/homeReducer';
import LoginReducer from './reducers/login/loginReducer';
import CommonReducer from './reducers/common/commonReducer';
import EditEquipmentTypeReducer from './reducers/editEquipmentType/editEquipmentTypeReducer';
import EditCollaboraterReducer from './reducers/editCollaborater/editCollaboraterReducer';
import EditEquipmentReducer from './reducers/editEquipment/editEquipmentReducer';
import AssignEquipmentReducer from './reducers/assignEquipment/assignEquipmentReducer';

const rootReducer = combineReducers(
    {
        HomeReducer,
        LoginReducer,
        EditCollaboraterReducer,
        CommonReducer,
        EditEquipmentTypeReducer,
        EditEquipmentReducer,
        AssignEquipmentReducer
    }
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

export default store;
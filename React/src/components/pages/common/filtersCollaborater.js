import GetFonctionsCollaborater from "../renderEditCollaborater/getFonctionsCollaborater";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import { GetCollaboratersFilters } from "../../../services/home/homeService";
import { GetEditCollaboratersFilters } from "../../../services/editCollaborater/editCollaboraterService";

export default function FiltersCollaborater(props) {
    const onSubmit = async (event) => {
        event.preventDefault();

        let response = "";

        if(props.isFromHome)
        {
            response = await GetCollaboratersFilters();
        }
        else
        {
            response = await GetEditCollaboratersFilters();
        }

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
        <div className={props.title + "-filter pb-3"}>
            <Form id="filter" onSubmit={event => onSubmit(event)}>
                <Form.Group className="row mb-auto mt-3">
                    <Form.Label className="col-md-1 mt-2">Mots-Clés</Form.Label>
                    <div className="col-md-3">
                        <Form.Control type="input" name="keyword" maxLength="50" placeholder="Nom, Prenom, E-mail" />
                    </div>

                    <GetFonctionsCollaborater filter/>
                    
                    {!props.isFromHome && 
                        <div className="col-md-1">
                            <Form.Check type="checkbox" className="mb-10 mt-2" label="Actif ?" defaultChecked name="isActif" />
                        </div>
                    }
                    <div className="col-md-1">
                        <Button type="submit" variant="primary"><FontAwesomeIcon icon={faFilter}/></Button>
                    </div>
                </Form.Group>
            </Form>
        </div>
    );

    return render;
}
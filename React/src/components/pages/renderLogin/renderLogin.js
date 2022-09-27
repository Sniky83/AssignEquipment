import { useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import Authentication from "../../../services/login/loginService";
import { connect } from 'react-redux';
import "./renderLogin.css";
import { Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";

function RenderLogin(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const [cookies, setCookie] = useCookies();

    const onSubmit = async (event) => {
        event.preventDefault();
    
        const response = await Authentication();

        if(response.status === 200)
        {
            setCookie('token', response.data.token)
        }
        else
        {
            setErrorMessage(response.message);
        }
    };
    
    const render = (
        <div className="login">
            <div className="card login-form">
                <div className="card-body">
                    <Image src={process.env.PUBLIC_URL + "/logo-apside.png"} fluid className="login-img mb-5 mt-2" width="240px" height="80px"/>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <Form id="login">
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Adresse Mail</Form.Label>
                            <Form.Control type="email" placeholder="jerome.dupont@gmail.com" name="uname" maxLength="50"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="********" name="pass" minLength="8" maxLength="16"/>

                            <Form.Text>
                                Le mot de passe doit contenir entre 8 et 16 caractères.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" className="login-button" type="submit" onClick={onSubmit}>
                            Se connecter
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {(cookies.token && props.LoginState.isConnected) ? <Navigate to="/"/> : render}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        LoginState: state.LoginReducer
    }
}

export default connect(mapStateToProps)(RenderLogin);
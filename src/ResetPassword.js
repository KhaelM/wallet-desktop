import React from 'react';
import logo from './openflex-logo.png';
import Button from './Button';

const errorHelper = require('./helpers/errosHelper');
const {PUBLIC_URL} = process.env

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPass: '',
            confPass: '',
            newPassErrors: [],
            confPassErrors: [],
            success: false,
            errorAfterForm: false
        }

        this.onNewPassChange = this.onNewPassChange.bind(this);
        this.onConfPassChange = this.onConfPassChange.bind(this);
        this.modify = this.modify.bind(this);
    }

    modify(token, event) {
        event.preventDefault();
        let newPassErrors = [];
        let confPassErrors = [];

        if (!this.state.newPass || this.state.newPass === '') {
            newPassErrors.push(errorHelper.getAttrRequiredErr());
        }

        if (!this.state.confPass || this.state.confPass === '') {
            confPassErrors.push(errorHelper.getAttrRequiredErr());
        }

        if (this.state.confPass !== '' && (this.state.newPass !== this.state.confPass)) {
            confPassErrors.push("Les mots de passe ne correspondent pas");
        }

        this.setState({ newPassErrors, confPassErrors });

        if (!newPassErrors.length && !confPassErrors.length) {
            const FETCH_URL = PUBLIC_URL + "/api/reset-password/" + token; 
            let password = this.state.newPass;
            fetch(FETCH_URL, {
                method: "PATCH",
                body: JSON.stringify({password}),
                headers: {"Content-type": "application/json; charset=UTF-8"}})
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            }) 
            .then(json => this.setState({success: true}))
            .catch(err => {
                this.setState({
                    errorAfterForm: true
                })
            });
        }
    }

    onNewPassChange(event) {
        this.setState({
            newPass: event.target.value,
            newPassErrors: [],
            confPassErrors: []
        })
    }

    onConfPassChange(event) {
        this.setState({
            confPass: event.target.value,
            newPassErrors: [],
            confPassErrors: []
        })
    }

    render() {
        const { search } = window.location;
        const params = new URLSearchParams(search);
        let token = params.get('token');
        if(!token) {
            return (<h1>Vous n'avez pas accès à cette page!</h1>);
        }

        const successOrForm = () => {
            if(this.state.success) {
                return (<div className="success">Votre mot de passe a bien été modifié</div>);
            } else {
                return (
                        <form onSubmit={(e) => this.modify(token, e)}>
                            <div className={this.state.newPassErrors.length ? "form-input vertical invalid" : "form-input vertical"} >
                                <label htmlFor="new-password">Nouveau mot de passe</label>
                                <input onChange={this.onNewPassChange} id="new-password" name="new-password" type="password" />
                                <div className="validation-errors">
                                    {this.state.newPassErrors.map((error, index) => {
                                        return (
                                            <div key={index}><small>{error}</small></div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={this.state.confPassErrors.length ? "form-input vertical invalid" : "form-input vertical"}>
                                <label htmlFor="confirm-password">Confirmer mot de passe</label>
                                <input onChange={this.onConfPassChange} id="confirm-password" name="confirm-password" type="password" />
                                <div className="validation-errors">
                                    {this.state.confPassErrors.map((error, index) => {
                                        return (
                                            <div key={index}><small>{error}</small></div>
                                        )
                                    })}
                                </div>
                            </div>
                            <Button id="modify-btn" className="full-btn openflex-green-bg" type="submit" value="Modifier" />
                        </form>
                );
            }
        }

        return (
            <div id="ResetPassword">
                <div>
                    <img src={logo} alt="Openflex Logo" />
                </div>
                <h1>Walli</h1>
                {this.state.errorAfterForm ?
                    <div className="error">Lien invalide ou expiré. Veuillez reprendre la procédure de réinitialisation de mot de passe depuis le début pour recevoir un nouveau mail.</div>:
                    successOrForm()
                }
            </div>
        );
    }
}
import { Component } from 'react';
import logo from './openflex-logo.png';

const errorHelper = require('./helpers/errosHelper');

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPass: '',
            confPass: '',
            errors: {
                newPass: [],
                confPass: []
            }
        }

        this.onNewPassChange = this.onNewPassChange.bind(this);
        this.onConfPassChange = this.onConfPassChange.bind(this);
        this.modify = this.modify.bind(this);
    }

    modify(event) {
        event.preventDefault();
        let errors = {
            newPass: [],
            confPass: []
        };

        if (!this.state.newPass || this.state.newPass === '') {
            errors.newPass.push(errorHelper.getAttrRequiredErr());
        }

        if (!this.state.confPass || this.state.confPass === '') {
            errors.confPass.push(errorHelper.getAttrRequiredErr());
        }
        if (this.state.newPass !== this.state.confPass) {
        }

        this.setState({
            errors
        })
    }

    onNewPassChange(event) {
        this.setState({
            newPass: event.target.value
        })
    }

    onConfPassChange(event) {
        this.setState({
            confPass: event.target.value,
        })
    }

    render() {
        return (
            <div id="ResetPassword">
                <div>
                    <img src={logo} alt="Openflex Logo" />
                </div>
                <h1>Wali</h1>
                <form onSubmit={this.modify}>
                    <div className={this.state.errors.newPass.length ? "form-input" : "form-input invalid"} >
                        <label htmlFor="new-password">Nouveau mot de passe</label>
                        <input onChange={this.onNewPassChange} id="new-password" className={this.state.errors.newPass.length ? "invalid" : ''} name="new-password" type="password" />
                        <div className="validation-errors">
                            {this.state.errors.newPass.map((error, index) => {
                                return (
                                    <small key={index}>{error}</small>
                                )
                            })}
                        </div>
                    </div>
                    <label htmlFor="confirm-password">Confirmer mot de passe</label>
                    <input onChange={this.onConfPassChange} id="confirm-password" name="confirm-password" type="password" />
                    <div className="validation-errors">
                        {this.state.errors.confPass.map((error, index) => {
                            return (
                                <small key={index}>{error}</small>
                            )
                        })}
                    </div>
                    <input type="submit" value="Modifier" />
                </form>
            </div>
        );
    }
}
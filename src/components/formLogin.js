import React, {Component} from 'react';
import './formLogin.css'
import {ClientConsumer} from "../providers/clientProvider";
import { withRouter } from 'react-router-dom'

class FormLogin extends Component {
    constructor(){
        super()
        this.state = {
            errorLog: false
        }
    }
    login(login, event){
        const email = event.target.parentElement.querySelector('input[name=email]').value
        if(email !== ''){
            const password = event.target.parentElement.querySelector('input[name=password]').value
            login(email, password)

            const url = "http://demo8606321.mockable.io/login"
            fetch(url).then(rawData => {
                rawData.json().then(value => {
                    console.log(value)
                })
            })
            this.setState({
                errorLog: false
            })
            this.props.history.push('/')
        }
        else{
            this.setState({
                errorLog: true
            })
        }
    }

    render() {
        return (
            <div className="content-modal">
                <div className="formLogin">
                    <h2>Login</h2>
                    {this.state.errorLog && <h4 className="erreur-log">Username obligatoire</h4>}
                    <input type="email" name="email" placeholder="Votre username"/>
                    <ClientConsumer>
                        {({isLogged, login, logout}) => (
                            <button className="button-login" onClick={(event) => isLogged ? logout() : this.login(login, event)}>Login</button>
                        )}
                    </ClientConsumer>

                </div>
            </div>
        );
    }
}

export default withRouter(FormLogin);

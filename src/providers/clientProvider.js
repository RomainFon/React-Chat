import React, { Component } from 'react';

const ClientContext = React.createContext()

export class ClientProvider extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLogged : false,
            userName : '',
            email : '',
            userPicture : ''
        }
    }

    login = (email, password) => {
        setTimeout(() => {
            this.setState({
                isLogged : true,
                email : '',
                userName : email,
                userPicture : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=100'
            })
        }, 0)
    }

    logout = () => {
        this.setState({
            isLogged : false,
            userName : '',
            email : '',
            userPicture : ''
        })
    }

    render() {
        const {children} = this.props
        return(
            <ClientContext.Provider
                value = {{
                    isLogged: this.state.isLogged,
                    logout : this.logout,
                    login : this.login,
                    userName : this.state.userName,
                    email : this.state.email,
                    userPicture : this.state.userPicture
                }}
            >
                { children }
            </ClientContext.Provider>
        )
    }
}

export const ClientConsumer = ClientContext.Consumer;
import React, {Component} from 'react';
import {ClientConsumer} from "../providers/clientProvider";

class Header extends Component {
    render() {
        return (
            <header className="header">
                <ClientConsumer>
                    {({isLogged, login, logout}) => (
                        <div>
                            <button onClick={() => isLogged ? logout() : login()}>
                                {isLogged ? 'Logout' : 'Login'}
                            </button>
                        </div>
                    )}

                </ClientConsumer>
            </header>
        );
    }
}

export default Header;

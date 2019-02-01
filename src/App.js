import React, { Component } from 'react';
import './App.css';
import {ClientProvider} from "./providers/clientProvider";
import {ChatProvider} from "./providers/chatProvider";
import {ClientConsumer} from "./providers/clientProvider";
import {ChatConsumer} from "./providers/chatProvider";
import FormLogin from "./components/formLogin"
import Chat from "./components/chat"
import About from "./components/about"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {

    getContentLogged(isLogged, messagesSeen, logout){
        if(isLogged){
            return(
                <ul className="navbar">
                    <li><a className="button-logout" href="javascript:;" onClick={logout}>Logout</a></li>
                    <li><Link to={"/chat"}>Chat<span>({messagesSeen})</span></Link></li>
                    <li><Link to={"/about"}>About</Link></li>
                </ul>
            )
        }
        else{
            return(
                <ul className="navbar">
                    <li><Link to={"/login"}>Login</Link></li>
                    <li><Link to={"/about"}>About</Link></li>
                </ul>
            )
        }
    }
    render() {
        return (
            <Router>
                <div className="App">
                    <ClientProvider>
                        <ChatProvider>
                                <ClientConsumer>
                                    {({isLogged, logout}) => (
                                        <ChatConsumer>
                                        {({messagesSeen}) => (
                                            this.getContentLogged(isLogged, messagesSeen, logout)
                                        )}
                                        </ChatConsumer>
                                    )}
                                </ClientConsumer>
                            <Route path="/login" component={FormLogin}/>
                            <Route path="/chat" component={Chat}/>
                            <Route path="/about" component={About}/>
                        </ChatProvider>
                    </ClientProvider>
                </div>
            </Router>
        );
    }
}

export default App;

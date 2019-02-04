import React, {Component} from 'react';
import {ClientConsumer} from "../providers/clientProvider";
import {ChatConsumer} from "../providers/chatProvider";
import { BrowserRouter as  Route, Link } from "react-router-dom";

class Navbar extends Component {

    getContentLogged(isLogged, messagesSeen, logout, userName){
        if(isLogged){
            return(
                <ul className="navbar">
                    <li className="userName">Bonjour {userName}</li>
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
          <ClientConsumer>
              {({isLogged, logout, userName}) => (
                  <ChatConsumer>
                  {({messagesSeen}) => (
                      this.getContentLogged(isLogged, messagesSeen, logout, userName)
                  )}
                  </ChatConsumer>
              )}
          </ClientConsumer>
        );
    }
}

export default Navbar;

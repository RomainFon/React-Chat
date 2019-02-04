import React, { Component } from 'react';
import './App.css';
import {ClientProvider} from "./providers/clientProvider";
import {ChatProvider} from "./providers/chatProvider";
import FormLogin from "./components/formLogin"
import Chat from "./components/chat"
import Navbar from "./components/navbar"
import About from "./components/about"
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <ClientProvider>
                        <ChatProvider>
                          <Navbar />
                          <div class="content-app">
                              <Route path="/login" component={FormLogin}/>
                              <Route path="/chat" component={Chat}/>
                              <Route path="/about" component={About}/>
                          </div>
                        </ChatProvider>
                    </ClientProvider>
                </div>
            </Router>
        );
    }
}

export default App;

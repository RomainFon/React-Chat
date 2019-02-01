import React, {Component} from 'react';
import './chat.css'
import {ClientConsumer} from "../providers/clientProvider";
import {ChatConsumer} from "../providers/chatProvider";

class Chat extends Component {
    constructor(props){
        super(props)
        this.socket = window.io.connect('http://localhost:4000');
    }

    getContent(isLogged, messages, sendMessage, userName){
        if(isLogged){
            let messageList = messages.map((element) => {
                return(
                    <li className="content-msg" key={element.id}>
                        <div className="date-msg">{element.date}</div>
                        <div className="user-msg">{element.user}</div>
                        <div className="msg-msg">{element.msg}</div>
                    </li>
                )
            })

            return(
                <div className="content-chat">
                    <div className="chat-discussion">
                        <ul className="message-list">
                            {messageList}
                        </ul>
                    </div>
                    <div className="write-message">
                        <input className="input-text-chat" type="text" name="text-message" placeholder="Entrer votre message"/>
                        <input onClick={(e) => {
                            e.preventDefault();
                            sendMessage(e.target.parentNode.querySelector('input[name=text-message]').value, userName);
                            e.target.parentNode.querySelector('input[name=text-message]').value = '';
                        }} className="button-send-message" type="button" name="send-message" value="Envoyer"/>
                    </div>
                </div>
            )
        }
        else{
            return (
                <h2>Veuillez vous connecter</h2>
            )
        }
    }

    render() {
        return (
            <div className="chat">
                <h2>CHAT</h2>
                <ClientConsumer>
                    {({isLogged, userName}) => (
                        <ChatConsumer>
                            {({messages, sendMessage}) => (
                                this.getContent(isLogged, messages, sendMessage, userName)
                            )}
                        </ChatConsumer>
                    )}
                </ClientConsumer>
            </div>
        );
    }
}

export default Chat;

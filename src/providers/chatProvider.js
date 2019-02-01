import React, { Component } from 'react';
import Message from '../entities/message'
import { withRouter } from 'react-router-dom'

const ChatContext = React.createContext()

export class ChatProviderClass extends Component{
    constructor(props){
        super(props)
        //let test = new Message('message' ,'Romain', Date.now())
        this.socket = window.io.connect('http://172.30.236.95:4000');

        this.socket.on('chat message', this.onMessage.bind(this))

        this.state = {
            //Type Message
            messages: [],
            messagesSeen: 0,
            connectedUsers: []
        }
        this.props.history.listen((location, done) =>{
            if(location.pathname === '/chat'){
                this.setState({messagesSeen: 0})
            }
        })
    }

    onMessage(msg){
        this.setState((state) => {
            let messagesSeenCount = state.messagesSeen
            if(this.props.location.pathname === '/chat'){
                messagesSeenCount = 0
            }else{
                messagesSeenCount++
            }

            let newMessages = state.messages.slice();
            newMessages.push(new Message(msg.msg, msg.user, msg.date))
            return{
                messages: newMessages,
                messagesSeen: messagesSeenCount
            }
        })
    }

    sendMessage(msg, user){
        console.log(msg)
        console.log(user)
        this.socket.emit('chat message', {msg: msg, user: user})
    }

    render() {
        const {children} = this.props
        return(
            <ChatContext.Provider
                value={{
                    messages: this.state.messages,
                    messagesSeen: this.state.messagesSeen,
                    connectedUsers: this.state.connectedUsers,
                    sendMessage: this.sendMessage.bind(this)
                }}
            >
                {children}
            </ChatContext.Provider>
        )
    }
}

export const ChatProvider = withRouter(ChatProviderClass);
export const ChatConsumer = ChatContext.Consumer;
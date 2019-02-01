import {format} from 'date-fns'

export default class Message{
    constructor(msg, user, date){
        this.formatMsg(msg)
        this.formatUser(user)
        this.formatDate(date)
        this.id = date
    }

    formatMsg(value){
        this.msg = value
    }

    formatUser(value){
        this.user = value
    }

    formatDate(value){
        this.date = format(new Date(value), 'DD/MM/YYYY HH:mm')
    }
}
import { useEffect, useState } from 'react'
import s from './chatWindow.module.scss'
import { ChatMessage, useConnectQuery } from '../../../services/chat/chatApi'
import { Message } from './message'
import { ChatMessageForm } from './chatMessageForm'

export const ChatWindow = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([])

    const { data } = useConnectQuery({})

    useEffect(() => {
        console.log(data)
        data && setMessages(data)
    }, [data])

    return (
        <div className={s.chatContainer}>
            <div className={s.messages}>
                {messages.length === 0 ? (
                    <div
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        No messages yet
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <Message
                            key={index}
                            message={msg.message}
                            photo={msg.photo}
                            userName={msg.userName}
                            userId={msg.userId}
                        />
                    ))
                )}
            </div>
            <ChatMessageForm />
        </div>
    )
}

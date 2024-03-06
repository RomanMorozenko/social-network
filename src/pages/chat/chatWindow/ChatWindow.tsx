import { Input, Button } from 'antd'
import { useEffect, useState } from 'react'
import s from './chatWindow.module.scss'
import {
    Message,
    useConnectQuery,
    useSendMutation,
} from '../../../services/chat/chatApi'

export const ChatWindow = () => {
    console.log('chat rerendered')
    const { TextArea } = Input

    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')
    const { data } = useConnectQuery({})
    const [send] = useSendMutation()

    useEffect(() => {
        data && setMessages(data)
    }, [data])

    const sendMessageHandler = () => {
        send(newMessage)
        setNewMessage('')
    }

    return (
        <div className={s.chatContainer}>
            <div className={s.messages}>
                {messages.length === 0 ? (
                    <div>No messages yet</div>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={s.message}>
                            {msg.message}{' '}
                        </div>
                    ))
                )}
            </div>
            <div className={s.inputForm}>
                <TextArea
                    rows={4}
                    placeholder="Type your message here"
                    maxLength={200}
                    style={{ resize: 'none' }}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button
                    style={{
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.88)',
                    }}
                    type="primary"
                    onClick={sendMessageHandler}
                >
                    Send
                </Button>
            </div>
        </div>
    )
}

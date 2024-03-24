import { Input, Button } from 'antd'
import { useSendMutation } from '../../../../services/chat/chatApi'

import s from './chatMessaageForm.module.scss'
import { useState } from 'react'

export const ChatMessageForm = () => {
    const { TextArea } = Input
    const [newMessage, setNewMessage] = useState('')
    const [send] = useSendMutation()

    const sendMessageHandler = () => {
        if (!newMessage) return
        send(newMessage)
        setNewMessage('')
    }
    return (
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
    )
}

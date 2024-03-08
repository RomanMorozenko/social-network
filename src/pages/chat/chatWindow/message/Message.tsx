import { ChatMessage } from '../../../../services/chat/chatApi'
import s from './message.module.scss'

export const Message = ({ message, photo, userName }: ChatMessage) => {
    return (
        <div className={s.message}>
            <div
                style={{ backgroundImage: `url(${photo})` }}
                className={s.messageUserAvatar}
            ></div>
            <p className={s.messageUserName}>{userName}</p>
            <p className={s.messageBody}>{message}</p>
        </div>
    )
}

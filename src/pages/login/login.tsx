import s from './login.module.scss'

import { Toast } from '../../components/ui/toast'
import { LoginForm } from './loginForm'
import { CaptchaModal } from './captchaModal'
import { useState } from 'react'
import { useMeQuery } from '../../services/auth/auth.service'
import { Navigate } from 'react-router'
import { MainImage } from '../../assets/images/MainImage'

export const Login = () => {
    const [isCaptchaModalActive, setIsCaptchaModalActive] = useState(false)
    const [captchaValue, setCaptchaValue] = useState('')
    const [captchaUrl, setCaptchaUrl] = useState('')

    const { data } = useMeQuery()

    const isAuthenticated = data?.resultCode == 1 ? false : true

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return (
        <div className={s.loginContainer}>
            <MainImage />
            <LoginForm
                captchaValue={captchaValue}
                setIsCaptchaModalActive={setIsCaptchaModalActive}
                setCaptchaUrl={setCaptchaUrl}
            />
            <Toast />
            {isCaptchaModalActive && (
                <CaptchaModal
                    url={captchaUrl}
                    value={captchaValue}
                    onChange={setCaptchaValue}
                    onSubmit={setIsCaptchaModalActive}
                />
            )}
        </div>
    )
}

import { loginPageImage } from '../../assets/images/loginPageImage'
import s from './login.module.scss'
// import { Layout } from 'antd'

// const { Header } = Layout

export const Login = () => {
    return (
        <div className={s.loginContainer}>
            <img src={loginPageImage} className={s.loginPageImage} />
            <LoginForm />
        </div>
    )
}

export const LoginForm = () => {
    return (
        <form className={s.loginForm}>
            <label htmlFor="login">Login</label>
            <input type="text" name="login" />
            <label htmlFor="password">Password</label>
            <input type="text" name="password" />
            <label htmlFor="rememberMe">Remember me:</label>
            <input type="checkbox" name="rememberMe" />
        </form>
    )
}

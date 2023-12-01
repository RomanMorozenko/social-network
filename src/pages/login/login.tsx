import { Navigate } from 'react-router'
import { loginPageImage } from '../../assets/images/loginPageImage'
import { useLogInMutation, useMeQuery } from '../../services/auth/auth.service'
import {
    UserOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
} from '@ant-design/icons'
import { Input, Checkbox, Button } from 'antd'
import s from './login.module.scss'
import { useState } from 'react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { FormItem } from 'react-hook-form-antd'

const loginSchema = z.object({
    email: z.string().trim().email('Please enter a valid email'),
    password: z.string().trim().min(3, 'Password mus be at least 3 characters'),
    rememberMe: z.boolean().optional().default(false),
})

type FormValues = z.infer<typeof loginSchema>

export const Login = () => {
    const { data } = useMeQuery()

    const isAuthenticated = data?.resultCode == 1 ? false : true

    if (isAuthenticated) return <Navigate to="/" />

    return (
        <div className={s.loginContainer}>
            <img src={loginPageImage} className={s.loginPageImage} />
            <LoginForm />
        </div>
    )
}

export const LoginForm = () => {
    const [isPassVisible, setIsPassVisible] = useState(false)

    const [logIn] = useLogInMutation()

    const { handleSubmit, control } = useForm<FormValues>({
        resolver: zodResolver(loginSchema),
    })

    const handleChangePassMode = () => {
        setIsPassVisible(!isPassVisible)
    }

    const passIconPrefix = isPassVisible ? (
        <EyeInvisibleOutlined
            onClick={handleChangePassMode}
            className="site-form-item-icon"
        />
    ) : (
        <EyeOutlined
            onClick={handleChangePassMode}
            className="site-form-item-icon"
        />
    )

    const handleSubmitForm = (data: FormValues) => {
        logIn(data)
    }

    return (
        <form className={s.loginForm} onSubmit={handleSubmit(handleSubmitForm)}>
            <FormItem control={control} name="email" label="email">
                <Input
                    placeholder="Enter your username"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    type="text"
                />
            </FormItem>
            <FormItem control={control} name="password" label="password">
                <Input
                    placeholder="Enter your password"
                    prefix={passIconPrefix}
                    type={isPassVisible ? 'text' : 'password'}
                />
            </FormItem>
            <FormItem
                control={control}
                name="rememberMe"
                label="rememberMe"
                valuePropName="checked"
            >
                <Checkbox type="checkbox" />
            </FormItem>
            <Button type="primary" htmlType="submit">
                Login
            </Button>
        </form>
    )
}

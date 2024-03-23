import {
    UserOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
} from '@ant-design/icons'
import { Input, Checkbox, Button } from 'antd'
import { useEffect, useState } from 'react'
import s from './loginForm.module.scss'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { FormItem } from 'react-hook-form-antd'
import { z } from 'zod'
import { useLazyGetCaptchaQuery } from '../../../services/security/security.service'
import { useLogInMutation } from '../../../services/auth/auth.service'

const loginSchema = z.object({
    email: z.string().trim().email('Please enter a valid email'),
    password: z
        .string()
        .trim()
        .min(3, 'Password must be at least 3 characters'),
    rememberMe: z.boolean().optional().default(false),
})

type FormValues = z.infer<typeof loginSchema>

type LoginForm = {
    captchaValue: string
    setIsCaptchaModalActive: (value: boolean) => void
    setCaptchaUrl: (value: string) => void
}

export const LoginForm = ({
    captchaValue,
    setIsCaptchaModalActive,
    setCaptchaUrl,
}: LoginForm) => {
    console.log('login FORM rendered')
    const [isPassVisible, setIsPassVisible] = useState(false)

    const [logIn, { data }] = useLogInMutation()
    const [getCaptcha, result] = useLazyGetCaptchaQuery()

    useEffect(() => {
        if (data?.resultCode === 10) {
            getCaptcha()
        }
    }, [data?.resultCode, getCaptcha])

    useEffect(() => {
        if (result.data?.url) {
            setCaptchaUrl(result.data?.url)
            setIsCaptchaModalActive(true)
        }
    }, [result.data?.url, setCaptchaUrl, setIsCaptchaModalActive])

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
        if (captchaValue) {
            const dataWithCaptcha = { ...data, captcha: captchaValue }
            logIn(dataWithCaptcha)
            setIsCaptchaModalActive(false)
        }
        logIn(data)
    }

    return (
        <form className={s.loginForm} onSubmit={handleSubmit(handleSubmitForm)}>
            <FormItem
                control={control}
                name="email"
                label="Email"
                valuePropName="text"
                className={s.formItem}
            >
                <Input
                    name="email"
                    className={s.input}
                    placeholder="Enter your email"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    type="text"
                />
            </FormItem>
            <FormItem
                control={control}
                name="password"
                label="Password"
                valuePropName="text"
                className={s.formItem}
            >
                <Input
                    name="password"
                    className={s.input}
                    placeholder="Enter your password"
                    prefix={passIconPrefix}
                    type={isPassVisible ? 'text' : 'password'}
                />
            </FormItem>
            <FormItem
                control={control}
                name="rememberMe"
                label="Remember me"
                valuePropName="checked"
                className={s.formItem}
            >
                <Checkbox type="checkbox" />
            </FormItem>
            <Button
                style={{ backgroundColor: '#001529' }}
                type="primary"
                htmlType="submit"
            >
                Login
            </Button>
        </form>
    )
}

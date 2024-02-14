import s from './captchaModal.module.scss'

type CaptchaModal = {
    url: string
    value: string
    onChange: (value: string) => void
    onSubmit: (value: boolean) => void
}

export const CaptchaModal = ({
    url,
    value,
    onChange,
    onSubmit,
}: CaptchaModal) => {
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }
    return (
        <div className={s.captchaModalOverlay}>
            <div className={s.captchaModal}>
                <h3>Type the symbols:</h3>
                <img src={url} alt="captcha" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleValueChange(e)}
                />
                <button
                    onClick={() => onSubmit(false)}
                    className={s.submitCaptcha}
                >
                    Submit captcha
                </button>
            </div>
        </div>
    )
}

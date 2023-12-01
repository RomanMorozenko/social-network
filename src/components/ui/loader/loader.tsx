import s from './loader.module.scss'

export const Loader = () => {
    return (
        <div className={s.sphereContainer}>
            <div className={s.sphere + s.sphere1}></div>
            <div className={s.sphere + s.sphere2}></div>
            <div className={s.sphere + s.sphere3}></div>
        </div>
    )
}

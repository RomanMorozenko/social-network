import s from './skeleton.module.scss'

type SkeletonProps = {
    classType: string
}

export const Skeleton = ({ classType }: SkeletonProps) => {
    const className = `${s.skeleton} ${s[classType]} ${s.animatePulse}`
    return <div className={className}></div>
}

import { useEffect, useState, KeyboardEvent } from 'react'
import { EditOutlined } from '@ant-design/icons'

type EditableSpanProps<C extends React.ElementType> = {
    as?: C
    value: string
    callback?: (arg: string) => void
    outerEditMode?: boolean
    outerModeControlValue?: () => void
    href?: string
    target?: string
    className?: string
    showEditIcon?: boolean
} & React.ComponentPropsWithoutRef<C>

export const EditableSpan = <C extends React.ElementType = 'span'>({
    as,
    children,
    value,
    outerEditMode,
    callback,
    className,
    showEditIcon,
    ...restProps
}: EditableSpanProps<C>) => {
    const Component = as || 'span'

    const [editMode, setEditMode] = useState(false)
    const [currentValue, setCurrentValue] = useState('')

    useEffect(() => {
        setCurrentValue(value)
        if (outerEditMode) {
            setEditMode(outerEditMode)
        }
    }, [value, outerEditMode])

    const handleSubmitNewValue = () => {
        setEditMode(false)
        callback && callback(currentValue)
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code == 'Enter') {
            handleSubmitNewValue()
        }
    }

    const onDoubleClick = () => {
        if (as == 'a') return
        setEditMode(true)
    }

    return (
        <div>
            {editMode ? (
                <input
                    {...(restProps as React.ComponentPropsWithoutRef<'input'>)}
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    onBlur={handleSubmitNewValue}
                    onKeyDown={(e) => onKeyDown(e)}
                    autoFocus
                >
                    {children}
                </input>
            ) : (
                <Component
                    onDoubleClick={onDoubleClick}
                    {...restProps}
                    className={className}
                >
                    {value}
                    {showEditIcon && (
                        <EditOutlined
                            style={{ marginLeft: '5px' }}
                            onClick={onDoubleClick}
                        />
                    )}
                </Component>
            )}
        </div>
    )
}

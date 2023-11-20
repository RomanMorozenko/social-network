import { useEffect, useState, KeyboardEvent } from 'react'

export type EditableSpanPropsType = {
    value: string
    callback: (arg: string) => void
    style?: string
}

export const EditableSpan = ({
    value,
    callback,
    style,
}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [currentValue, setCurrentValue] = useState('')

    useEffect(() => {
        setCurrentValue(value)
    }, [value])

    const handleStatusChange = () => {
        setEditMode(false)
        callback(currentValue)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code == 'Enter') {
            handleStatusChange()
        }
    }

    return (
        <div className={style}>
            {editMode ? (
                <input
                    type="text"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    onBlur={handleStatusChange}
                    onKeyDown={(e) => handleKeyDown(e)}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={() => setEditMode(true)}>
                    {currentValue}
                </span>
            )}
        </div>
    )
}

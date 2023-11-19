import { useEffect, useState } from 'react'

export type EditableSpanPropsType = {
    value: string
}

export const EditableSpan = ({ value }: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [currentValue, setCurrentValue] = useState('')

    useEffect(() => {
        setCurrentValue(value)
    }, [value])

    return (
        <div>
            {editMode ? (
                <input
                    type="text"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    onBlur={() => setEditMode(false)}
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

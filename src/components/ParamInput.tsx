import type { ChangeEvent, FC } from "react"
import type { ParamInputProps } from "../types"

export const ParamInput: FC<ParamInputProps> = ({param, value, onChange}: ParamInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(param.id, e.target.value)
    }
    
    return (
        <div>
            <label>
                {param.name}
            </label>
            <input 
                value={value} 
                onChange={handleChange} 
            />
        </div>
    )
}
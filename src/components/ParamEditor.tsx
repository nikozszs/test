import { useState, type FC } from "react"
import { ParamInput } from "./ParamInput"
import type { Model, ParamValue, Props } from "../types"

export const ParamEditor: FC<Props> = ({params, model}) => {
    const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues)

    const handleChange = (paramId: number, value: string) => {
        setParamValues(prev => {
            const exist = prev.find(pv => pv.paramId === paramId)
            if (exist) {
                return prev.map(pv => pv.paramId === paramId ? {...pv, value} : pv)
            }
            return [...prev, {paramId, value}]
        })
    }

    const getModel = (): Model => ({
        paramValues: [...paramValues]
    })
    return (
        <div>
            {params.map(param => {
                const paramValue = paramValues.find(pv => pv.paramId === param.id)
                return <ParamInput 
                    key={param.id}
                    param={param}
                    value={paramValue?.value || ''}
                    onChange={handleChange}
                    />
            })}
            <button onClick={() => console.log(getModel())}>
                Log Model
            </button>
        </div>
    )
}
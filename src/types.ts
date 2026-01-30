export interface Param {
    id: number;
    name: string;
    type: 'string' | 'number' | 'select';
}

export interface ParamValue {
    paramId: number;
    value: string;
}

export interface Model {
    paramValues: ParamValue[];
}

export interface Props {
    params: Param[];
    model: Model;
}

export interface ParamInputProps {
    param: Param;
    value: string;
    onChange: (paramId: number, value: string) => void;
}
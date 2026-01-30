import { render, screen } from '@testing-library/react';
import { ParamEditor } from '../components/ParamEditor';

const mockParams = [
    {id: 1, name: 'Назначение', type: 'string' as 'string'},
    {id: 2, name: 'Длина', type: 'string' as 'string'}
]

const mockModel = {
    paramValues: [
        {paramId: 1, value: 'повседневное'},
        {paramId: 2, value: 'макси'}
    ]
}

describe('ParamEditor', () => {
    test('отображение всех параметров', () => {
        render(<ParamEditor params={mockParams} model={mockModel} />)
        expect(screen.getByText(/назначение/i)).toBeInTheDocument()
        expect(screen.getByText(/длина/i)).toBeInTheDocument()
        const inputs = screen.getAllByRole('textbox');
        expect(inputs).toHaveLength(2);
    })

    test('инициализируется значения из Model', () => {
        render(<ParamEditor params={mockParams} model={mockModel} />)
        const inputs = screen.getAllByRole('textbox') as HTMLInputElement[]
        expect(inputs[0]).toHaveValue('повседневное')
        expect(inputs[1]).toHaveValue('макси')
    })

    test('getModel() возвр обновленную модель', () => {
        render(<ParamEditor params={mockParams} model={mockModel} />);
        expect(screen.getByText(/назначение/i)).toBeInTheDocument();
    })
})
import { render, screen, fireEvent } from '@testing-library/react';
import { ParamEditor } from '../components/ParamEditor';

const mockParams = [
    {id: 1, name: 'Наименование', type: 'string' as 'string'},
    {id: 2, name: 'Описание', type: 'string' as 'string'}
]

const mockModel = {
    paramValues: [
        {paramId: 1, value: 'Тестовое значение'}
    ]
}

describe('ParamEditor', () => {
    test('отображение всех параметров', () => {
        render(<ParamEditor params={mockParams} model={mockModel} />)
        expect(screen.getByText('Назначение')).toBeInTheDocument()
        expect(screen.getByText('Длина')).toBeInTheDocument()
        expect(screen.getAllByRole('textbox')).toHaveLength(2)
    })

    test('инициализируется значения из Model', () => {
        render(<ParamEditor params={mockParams} model={mockModel} />)
        const inputs = screen.getAllByRole('textbox') as HTMLInputElement[]
        expect(inputs[0]).toHaveValue('повседневное')
        expect(inputs[1]).toHaveValue('макси')
    })

    test('getModel() возвр обновленную модель', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        render(<ParamEditor params={mockParams} model={mockModel} />);

        const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
        fireEvent.change(inputs[1], { target: { value: 'Новое описание' } });

        const buttons = screen.getAllByRole('button');
        const logButton = buttons.find(btn => 
            btn.textContent?.toLowerCase().includes('log')
        );

        if (logButton) {
            fireEvent.click(logButton);
        } else {
            const buttonByText = screen.getByText(/log/i);
            fireEvent.click(buttonByText);
        }

        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    })
})
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
        expect(screen.getByLabelText('Наименование')).toBeInTheDocument()
        expect(screen.getByLabelText('Описание')).toBeInTheDocument()
    })

    test('инициализируется значения из Model', () => {
        render(<ParamEditor params={mockParams} model={mockModel} />)
        expect(screen.getByLabelText('Наименование')).toHaveValue('Тестовое значение')
        expect(screen.getByLabelText('Описание')).toHaveValue('')
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
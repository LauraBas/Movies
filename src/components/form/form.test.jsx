import {render, screen, fireEvent } from  '@testing-library/react'

import Form from "./form";

test('Should render a placeholder', () => {
    render( <Form title="tenet"/>)
    expect(screen.getByPlaceholderText('tenet')).toBeInTheDocument();
});

test('should call submit method when submit button is clicked', () => {
    const submitClick = jest.fn()
    render(<Form title="tenet" submitClick={submitClick}/>)
    const input = screen.getByPlaceholderText('tenet');
    fireEvent.change(input, { target: { value: 'amelie' } })
    fireEvent.click(screen.getByText('Submit'))

    expect(submitClick).toHaveBeenCalledTimes(1)
    expect(submitClick).toHaveBeenCalledWith({title: "amelie"})
})

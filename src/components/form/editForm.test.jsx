import {render, screen, fireEvent } from  '@testing-library/react'

import EditForm from "./editForm";

test('Should render a placeholder', () => {
    render( <EditForm title="tenet"/>)
    expect(screen.getByPlaceholderText('tenet')).toBeInTheDocument();
});

test('should call submit method when submit button is clicked', () => {
    const submitClick = jest.fn()
    render(<EditForm title="tenet" id="1" submitClick={submitClick}/>)
    const input = screen.getByPlaceholderText('tenet');
    fireEvent.change(input, { target: { value: 'amelie' } })
    fireEvent.click(screen.getByText('Submit'))

    expect(submitClick).toHaveBeenCalledTimes(1)
    expect(submitClick).toHaveBeenCalledWith({title: "amelie", id:"1"})
})

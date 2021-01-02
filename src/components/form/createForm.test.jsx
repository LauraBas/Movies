import {render, screen, fireEvent } from  '@testing-library/react'

import CreateForm from "./createForm";

test('Should render a placeholder', () => {
    render( <CreateForm />)
    expect(screen.getByPlaceholderText("title")).toBeInTheDocument();
});

test('should call submit method when submit button is clicked', () => {
    const submitClick = jest.fn()
    render(<CreateForm submitClick={submitClick}/>)
    const input = screen.getByPlaceholderText('title');
    fireEvent.change(input, { target: { value: 'amelie' } })
    fireEvent.click(screen.getByText('Submit'))

    expect(submitClick).toHaveBeenCalledTimes(1)
    expect(submitClick).toHaveBeenCalledWith({title: "amelie"})
})
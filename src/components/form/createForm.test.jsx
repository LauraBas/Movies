import {render, screen, fireEvent } from  '@testing-library/react'

import CreateForm from "./createForm";

test('Should render a placeholder', () => {
    render( <CreateForm />)
    expect(screen.getByPlaceholderText("title")).toBeInTheDocument();
});

test('should call submit method when submit button is clicked', () => {
    const submitClick = jest.fn()
    render(<CreateForm submitClick={submitClick}/>)
    const title = screen.getByPlaceholderText('title');
    fireEvent.change(title, { target: { value: 'amelie' } })
    const ranking =  screen.getByPlaceholderText('ranking');
    fireEvent.change(ranking, { target: { value: '8' } })
    const type = screen.getByPlaceholderText('type')
    fireEvent.change(type, { target: { value: 'romantic'}})
    const director = screen.getByPlaceholderText('director')
    fireEvent.change(director, { target: { value: 'Tiersenn'}})
    fireEvent.click(screen.getByText('Submit'))

    expect(submitClick).toHaveBeenCalledTimes(1)
    expect(submitClick).toHaveBeenCalledWith({title: "amelie", ranking:"8", type:"romantic", director:"Tiersenn"})
})
import {render, screen, fireEvent } from  '@testing-library/react'

import CreateForm from "./CreateForm";

test('Should render a placeholder', () => {
    render( <CreateForm />)
    expect(screen.getByPlaceholderText("title")).toBeInTheDocument();
});

test('should call submit method when submit button is clicked', () => {
    const submitClick = jest.fn()
    render(<CreateForm submitClick={submitClick}/>)
    const title = screen.getByPlaceholderText('title');
    fireEvent.change(title, { target: { value: 'amelie' } })
    const image = screen.getByPlaceholderText('image');
    fireEvent.change(image, { target: {value: 'img/amelie.jpg' }})
    const ranking =  screen.getByPlaceholderText('ranking');
    fireEvent.change(ranking, { target: { value: '8' } })
    const type = screen.getByPlaceholderText('type')
    fireEvent.change(type, { target: { value: 'romantic'}})
    const director = screen.getByPlaceholderText('director')
    fireEvent.change(director, { target: { value: 'Tiersenn'}})
    fireEvent.click(screen.getByText('Submit'))

    expect(submitClick).toHaveBeenCalledTimes(1)
    expect(submitClick).toHaveBeenCalledWith({title: "amelie",image:"img/amelie.jpg", ranking:"8", type:"romantic", director:"Tiersenn"})
})

test('should call cancel method when cancel button is clicked', () => {
    const cancelClickMock = jest.fn()
    render(<CreateForm cancelClick={cancelClickMock}/>)

    fireEvent.click(screen.getByText('Cancel'))

    expect(cancelClickMock).toHaveBeenCalled()
})

test('should return an error message if title field is empty', () => {
    render(<CreateForm />)

    const title = screen.getByPlaceholderText('title');
    fireEvent.change(title, { target: { value: '' } })
    
    fireEvent.click(screen.getByText('Submit'))

    expect(screen.getAllByText('Required field'))
})
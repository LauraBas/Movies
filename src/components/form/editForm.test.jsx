import {render, screen, fireEvent } from  '@testing-library/react'

import EditForm from "./EditForm";

test('Should render a placeholder', () => {
    render( <EditForm title="tenet"/>)
    expect(screen.getByPlaceholderText('tenet')).toBeInTheDocument();
});

test('should call submit method when submit button is clicked', () => {
    const submitClick = jest.fn()
    render(<EditForm title='tenet' image="img/tenet.jpg" id="1" ranking="10" type="accion" director="Nollan" submitClick={submitClick}/>)
    const title = screen.getByPlaceholderText('tenet');
    fireEvent.change(title, { target: { value: 'amelie' }})
    const image = screen.getByPlaceholderText('img/tenet.jpg');
    fireEvent.change(image, { target: { value: 'img/amelie.jpg' }})
    const ranking =  screen.getByPlaceholderText('10');
    fireEvent.change(ranking, { target: { value: '8' } })
    const type = screen.getByPlaceholderText('accion')
    fireEvent.change(type, { target: { value: 'romantic'}})
    const director = screen.getByPlaceholderText('Nollan')
    fireEvent.change(director, { target: { value: 'Tiersenn'}})
    
    fireEvent.click(screen.getByText('Submit'))

    expect(submitClick).toHaveBeenCalledTimes(1)
    expect(submitClick).toHaveBeenCalledWith({title: "amelie",image: "img/amelie.jpg", id:"1", ranking:"8", type:"romantic", director:"Tiersenn"})
})

test('should call cancel edit method when cancel button is clicked', () => {
    const cancelEditClickMock = jest.fn()
    render(<EditForm cancelEditClick={cancelEditClickMock}/>)

    fireEvent.click(screen.getByText('Cancel'))

    expect(cancelEditClickMock).toHaveBeenCalled()
})

test('should return an error message if title field is empty', () => {
    render(<EditForm title='tenet' image="img/tenet.jpg" id="1" ranking="10" type="accion" director="Nollan"/>)

    const title = screen.getByPlaceholderText('tenet');
    fireEvent.change(title, { target: { value: '' } })
    
    fireEvent.click(screen.getByText('Submit'))

    expect(screen.getAllByText('Required field'))
})


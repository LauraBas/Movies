import {render, screen, fireEvent } from  '@testing-library/react'

import EditForm from "./editForm";

test('Should render a placeholder', () => {
    render( <EditForm title="tenet"/>)
    expect(screen.getByPlaceholderText('tenet')).toBeInTheDocument();
});

test('should call submit method when submit button is clicked', () => {
    const submitClick = jest.fn()
    render(<EditForm title='tenet' id="1" ranking="10" type="accion" director="Nollan" submitClick={submitClick}/>)
    const title = screen.getByPlaceholderText('tenet');
    fireEvent.change(title, { target: { value: 'amelie' } })
    const ranking =  screen.getByPlaceholderText('10');
    fireEvent.change(ranking, { target: { value: '8' } })
    const type = screen.getByPlaceholderText('accion')
    fireEvent.change(type, { target: { value: 'romantic'}})
    const director = screen.getByPlaceholderText('Nollan')
    fireEvent.change(director, { target: { value: 'Tiersenn'}})
    
    fireEvent.click(screen.getByText('Submit'))

    expect(submitClick).toHaveBeenCalledTimes(1)
    expect(submitClick).toHaveBeenCalledWith({title: "amelie", id:"1", ranking:"8", type:"romantic", director:"Tiersenn"})
})

import { render, screen, fireEvent } from '@testing-library/react'

import CardMovie from "./CardMovie";

test('Should render a movie title', () => {
    render ( <CardMovie title="tenet"/>)

    const title = screen.getByText("tenet")

    expect(title).toBeInTheDocument();
})

test('Should render movies titles', () => {
    render (<CardMovie
        ranking="10, 10, 9"
        title="tenet, inception, amelie"
        image="img/2.jpg, img/4.jpg, img/7.jpg"
        type="accion, drama, romantic"
        director="Christopher Nollan, Christopher Nollan, Yann Tiersenn"/>)
    const titles = screen.getByText('tenet, inception, amelie')

    expect(titles).toBeInTheDocument();
})

test('render a button with delete text', () => {
    render(<CardMovie />)
    const deleteButton = screen.getByRole('button', {name: "Delete"})

    expect(deleteButton).toBeInTheDocument();
})

test('should calls onClick with id once when clicked', () => {
    const deleteClick = jest.fn()
    render(<CardMovie id="5" deleteClick={deleteClick}/>)

    fireEvent.click(screen.getByText("Delete"))

    expect(deleteClick).toHaveBeenCalledTimes(1)
    expect(deleteClick).toHaveBeenCalledWith("5")
})

test('should call editClick with id once when clicked', () => {
    const editClick = jest.fn()
    render(<CardMovie id="5" editClick={editClick}/>)

    fireEvent.click(screen.getByText('Edit'))
    
    expect(editClick).toHaveBeenCalledTimes(1)
    expect(editClick).toHaveBeenCalledWith("5")
})



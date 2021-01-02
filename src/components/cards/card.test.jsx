import { render, screen, fireEvent } from '@testing-library/react'

import CardMovie from "./cardMovie";

test('Should render a movie title', () => {
    render ( <CardMovie title="tenet"/>)
    const title = screen.getByText("tenet")
    expect(title).toBeInTheDocument();
})

test('Should render movies titles', () => {
    render (<CardMovie title="tenet, inception, amelie"/>)
    const titles = screen.getByText('tenet, inception, amelie')
    expect(titles).toBeInTheDocument();
})

test('render a button with delete text', () => {
    render(<CardMovie />)
    const deleteButton = screen.getByRole('button', {name: /delete/i})
    expect(deleteButton).toBeInTheDocument();
})

test('should calls onClick with id once when clicked', () => {
    const deleteClick = jest.fn()
    render(<CardMovie id="5" deleteClick={deleteClick}/>)
    fireEvent.click(screen.getByText(/delete/i))
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



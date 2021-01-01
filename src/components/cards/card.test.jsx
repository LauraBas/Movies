import { render, screen, fireEvent } from '@testing-library/react'

import Card from "./card";

test('Should render a movie title', () => {
    render ( <Card title="tenet"/>)
    const title = screen.getByText("tenet")
    expect(title).toBeInTheDocument();
})

test('Should render movies titles', () => {
    render (<Card title="tenet, inception, amelie"/>)
    const titles = screen.getByText('tenet, inception, amelie')
    expect(titles).toBeInTheDocument();
})

test('render a button with delete text', () => {
    render(<Card />)
    const deleteButton = screen.getByRole('button', {name: /delete/i})
    expect(deleteButton).toBeInTheDocument();
})

test('should calls onClick with id once when clicked', () => {
    const deleteClick = jest.fn()
    render(<Card id="5" deleteClick={deleteClick}/>)
    fireEvent.click(screen.getByText(/delete/i))
    expect(deleteClick).toHaveBeenCalledTimes(1)
    expect(deleteClick).toHaveBeenCalledWith("5")
})



import { render, screen } from '@testing-library/react';
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
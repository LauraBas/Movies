import { render, screen } from '@testing-library/react';
import List from "./list";

test('should display one card if data contains one movie', () => {
    render(<List data={[{
        title:'tenet'
    }]} />);
    expect(screen.getByText('tenet')).toBeInTheDocument();
})

test('should display all cards from data',() => {
    render(<List data = {[
        {title: 'tenet'},
        {title: 'inception'},
        {title: 'amelie'} 
    ]} />);
    expect(screen.getByText('tenet')).toBeInTheDocument();
    expect(screen.getByText('inception')).toBeInTheDocument();
    expect(screen.getByText('amelie')).toBeInTheDocument();
})
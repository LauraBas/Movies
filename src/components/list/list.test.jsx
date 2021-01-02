import { render, screen, fireEvent } from '@testing-library/react';
import List from "./list";

test('should display one card if data contains one movie', () => {
    render(<List data={[{
        title:'tenet', id:"0"
    }]} />);
    expect(screen.getByText('tenet')).toBeInTheDocument();
})

test('should display all cards from data',() => {
    render(<List data = {[
        {title: 'tenet', id:"0"},
        {title: 'inception', id:"1"},
        {title: 'amelie', id:"2"} 
    ]} />);
    expect(screen.getByText('tenet')).toBeInTheDocument();
    expect(screen.getByText('inception')).toBeInTheDocument();
    expect(screen.getByText('amelie')).toBeInTheDocument();
})

test('should remove card when delete button is clicked', () => {
    render (<List data={[
        { title:'tenet',
        id: "10"},
        {title: 'amelie',
         id: "11"},        
    ]} />)
    
    fireEvent.click(screen.getAllByText("Delete")[0])
    expect(screen.queryByText('tenet')).not.toBeInTheDocument();
    expect(screen.queryByText('amelie')).toBeInTheDocument();
})

test('should display a form when edit button is clicked', () =>{
    render (<List data={[
        { title:'tenet',
        id: "10"},
        {title: 'amelie',
         id: "11"},        
    ]} />)
    fireEvent.click(screen.getAllByText("Edit")[0])
    expect(screen.getByPlaceholderText('tenet')).toBeInTheDocument();
})

test('should update title', () => {
    render (<List data={[
        { title:'tenet',
        id: "10"},
        {title: 'amelie',
         id: "11"},        
    ]} />)
    fireEvent.click(screen.getAllByText("Edit")[0])
    const input = screen.getByPlaceholderText('tenet');
    fireEvent.change(input, { target: { value: 'inception' } })
    fireEvent.click(screen.getByText('Submit'))

    expect(screen.getByText('inception')).toBeInTheDocument()
    expect(screen.queryByText('tenet')).not.toBeInTheDocument()

})

test('should display a form when new movie button is clicked', () => {
    render (<List data={[
        { title:'tenet',
        id: "10"},
        {title: 'amelie',
         id: "11"},        
    ]} />)
    fireEvent.click(screen.getByText("Create"))  
    const input = screen.getByPlaceholderText('title');
    expect(input).toBeInTheDocument()    
})

test('should create new card when submit button is clicked', () => {
    render (<List data={[]} />)

    createMovie('inception')
    createMovie('amelie')
   
    fireEvent.click(screen.getAllByText("Delete")[0])
    expect(screen.queryByText('inception')).not.toBeInTheDocument();
    expect(screen.getByText('amelie')).toBeInTheDocument();

})

function createMovie(movie){
    fireEvent.click(screen.getByText("Create"))  
    const input = screen.getByPlaceholderText('title');
    fireEvent.change(input, { target: { value: movie } })
    fireEvent.click(screen.getByText('Submit'))
};
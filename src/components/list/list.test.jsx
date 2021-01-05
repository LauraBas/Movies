import { render, screen, fireEvent } from '@testing-library/react';
import List from "./List";

function createMovie(movie){
    fireEvent.click(screen.getByText("Create Movie")); 
    const input = screen.getByPlaceholderText('title');
    fireEvent.change(input, { target: { value: movie } });
    fireEvent.click(screen.getByText('Submit'));
}

test('should display all cards from data',() => {
    render(<List data = {[
        {title: 'tenet', image: "img/tenet.jpg",id:"0", ranking: 10, type:"accion", director:"Nollan"},
        {title: 'inception', image: "img/inception.jpg", id:"1" , ranking: 8, type:"drama", director:"Nollan"},
        {title: 'amelie',image: "img/amelie.jpg", id:"2" , ranking: 10, type:"romantic", director:"Tiersen"},
    ]} />);

    expect(screen.getByText('tenet')).toBeInTheDocument();
    expect(screen.getByText('inception')).toBeInTheDocument();
    expect(screen.getByText('drama')).toBeInTheDocument();
    expect(screen.getByText('amelie')).toBeInTheDocument();
    expect(screen.getByText('Tiersen')).toBeInTheDocument();
})

test('should calls handleDelete with id when delete button is clicked', () => {
    const handleDeleteMock = jest.fn()    
    render (<List 
                handleDelete={handleDeleteMock} 
                data={[{title: 'tenet', image: "img/tenet.jpg",id:"1", ranking: 10, type:"accion", director:"Nollan"}]} />)
    
    fireEvent.click(screen.getByText("Delete"))

    expect(handleDeleteMock).toHaveBeenCalled()
    expect(handleDeleteMock).toHaveBeenCalledWith("1");
})


test('should calls handleUpdate with movie when submit button in edit is clicked', () => {
    const handleUpdateMock = jest.fn()
    render (<List     
                handleUpdate={handleUpdateMock} 
                data={[{title: 'tenet',image: "img/tenet.jpg", id:"0", ranking: 10, type:"accion", director:"Nollan"}]} />)

    updateMovieTitle('tenet', 'inception')

    expect(handleUpdateMock).toHaveBeenCalled()
    expect(handleUpdateMock).toHaveBeenCalledWith({title: 'inception',image: "img/tenet.jpg", id:"0", ranking: 10, type:"accion", director:"Nollan"});

})

test('should calls handleCreate with movie when submit button is clicked', () => {
    const handleCreateMock = jest.fn()
    render (<List 
        handleCreate={handleCreateMock}
        data={[]} />)
    
    createMovie('inception')
    
    expect(handleCreateMock).toHaveBeenCalled()
    expect(handleCreateMock).toHaveBeenCalledWith({title: 'inception', image: '', director:'', ranking:'', type:''})
    
})

test('should display a form when create movie button is clicked', () => {
    render (<List data={[
        {title: 'tenet', image: "img/tenet.jpg", id:"0", ranking: 10, type:"accion", director:"Nollan"},
        {title: 'amelie',image: "img/amelie.jpg", id:"2" , ranking: 10, type:"romantic", director:"Tiersen"},       
    ]} />)
    fireEvent.click(screen.getByText("Create Movie"))  
    const input = screen.getByPlaceholderText('title');

    expect(input).toBeInTheDocument()    
});

test('should clean the create form when cancel button is clicked', () => {
    
    render(<List />)   
    fireEvent.click(screen.getByText("Create Movie")) 
    const submitButton = screen.queryByText('Submit')

    fireEvent.click(screen.getByText("Cancel"))

    expect(submitButton).not.toBeInTheDocument()    
})

test('should display a form when edit button is clicked', () =>{
    render (<List data={[
        {title: 'tenet', image: "img/tenet.jpg", id:"0", ranking: 10, type:"accion", director:"Nollan"},
        {title: 'amelie',image: "img/amelie.jpg", id:"2" , ranking: 10, type:"romantic", director:"Tiersen"}      
    ]} />)
    fireEvent.click(screen.getAllByText("Edit")[0])
    
    expect(screen.getByPlaceholderText('tenet')).toBeInTheDocument();
});

test('should clean the edit form when cancel button is clicked', () => {    
    render(<List data={[
        {title: 'tenet', image: "img/tenet.jpg", id:"0", ranking: 10, type:"accion", director:"Nollan"},     
    ]} />)
        
    fireEvent.click(screen.getByText("Edit")) 
    const submitButton = screen.queryByText('Submit')

    fireEvent.click(screen.getByText("Cancel"))

    expect(submitButton).not.toBeInTheDocument()    
})

function updateMovieTitle(movieToUpdate, movieChanged) {
    fireEvent.click(screen.getByText("Edit"))
    const input = screen.getByPlaceholderText(movieToUpdate);
    fireEvent.change(input, { target: { value: movieChanged } })
    fireEvent.click(screen.getByText('Submit'))
}
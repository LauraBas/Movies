import  React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CardMovie from '../cards/cardMovie';
import EditForm from '../form/editForm';
import CreateForm from '../form/createForm';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck'


class List extends Component{
    constructor(props){
        super(props) 
        this.state = {
            movies: props.data.map(movie => ({...movie, edit: false})),
            createMode: false,
        }

        this.createMovie = this.createMovie.bind(this)
    }

    deleteCard(id){
        this.setState({
            movies: this.state.movies.filter(item => id != item.id)
        })
    }
    editCard(id){
        this.setState({
            movies: this.state.movies.map(item =>{
                if (id == item.id) {
                    return {...item, edit: true}
                } else {
                    return {...item, edit: false}
                }
            })
        })
    }

    updateCard(updatedMovie){
        this.setState({
            movies: this.state.movies.map(movie=>{
                if(updatedMovie.id == movie.id) {
                    return {edit: false, ...updatedMovie}
                } else {
                    return movie
                }
            })
        })
    }

    createMovie(){
        this.setState({
            createMode: true,
        })
    }

    createCard(movie){
        const newMovie = { id: uuidv4(), title: movie.title }
        this.setState({
            movies: this.state.movies.concat(newMovie),
            createMode: false,
        })
    }

    render(){
        return (
            <div>
                <CardDeck>
                    {this.state.movies && this.state.movies.map(item => {
                        if (!item.edit) {
                            return <CardMovie
                                key={item.id} 
                                title={item.title} 
                                id={item.id}
                                deleteClick={(id) => this.deleteCard(id)}
                                editClick={(id)=>this.editCard(id)}/>
                        } else {
                            return <EditForm
                                key={item.id} 
                                title={item.title}
                                id={item.id}
                                submitClick={(movie)=>this.updateCard(movie)}/>                        
                        }
                            
                    })}
                </CardDeck>
                {this.state.createMode 
                    ? <CreateForm                    
                        submitClick={(movie)=>this.createCard(movie)}
                        />
                    : <Button variant="warning" onClick={this.createMovie}>Create</Button>}
            </div>
        );
    }
}
  
  


export default List;
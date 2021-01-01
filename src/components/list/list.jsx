import  React, { Component } from 'react';
import Card from '../cards/card';
import Form from '../form/form';
import { render } from 'react-dom';

class List extends Component{
    constructor(props){
        super(props) 
        this.state = {
            movies: props.data.map(movie => ({...movie, edit: false})),
        }
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

    render(){
        return (
            <div>
                {this.state.movies && this.state.movies.map(item => {
                    if (!item.edit) {
                        return <Card 
                            key={item.title} 
                            title={item.title} 
                            id={item.id}
                            deleteClick={(id) => this.deleteCard(id)}
                            editClick={(id)=>this.editCard(id)}/>
                    } else {
                        return <Form 
                            key={item.id} 
                            title={item.title}
                            id={item.id}
                            submitClick={(movie)=>this.updateCard(movie)}/>                        
                    }
                        
                })};
            </div>
        );
    }
}
  
  


export default List;
import  React, { Component } from 'react';
import Card from '../cards/card';
import { render } from 'react-dom';

class List extends Component{
    constructor(props){
        super(props) 
        this.state = {
            movies: props.data,
        }
    }

    deleteCard(id){
        this.setState({
            movies: this.state.movies.filter(item => id != item.id)
        })
    }

    render(){
        return (
            <div>
                {this.state.movies && this.state.movies.map(item => 
                    <Card 
                        key={item.title} 
                        title={item.title} 
                        id={item.id}
                        deleteClick={(id) => this.deleteCard(id)}/>)
                };
            </div>
        );
    }
}
  
  


export default List;
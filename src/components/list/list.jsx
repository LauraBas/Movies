import  React, { Component } from 'react';
import CardMovie from '../cards/CardMovie';
import EditForm from '../form/EditForm';
import CreateForm from '../form/CreateForm';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';

class List extends Component{
    constructor(props){
        super(props) 
        this.state = {
            editId: "-1",
            createMode: false,
        }
        this.toggleMovieForm = this.toggleMovieForm.bind(this)
    }

    deleteCard(id){
        this.props.handleDelete(id)
    }

    editCard(id){
        this.setState({
            editId: id,
        })
    }

    updateCard(updatedMovie){
        this.props.handleUpdate(updatedMovie)
        this.setState({
            editId: "-1"
        })
    }

    toggleMovieForm(){
        this.setState({ createMode: !this.state.createMode })
    }

    cancelCreateForm(){
        this.setState({ createMode: false })
    }

    createCard(movie){
        this.props.handleCreate(movie)
        this.toggleMovieForm();
    }
     
    render(){
        return (
            <div>               
                <CardDeck>
                    {this.props.data && this.props.data.map(item => {
                        if (this.state.editId !== item.id) {
                            return <CardMovie
                                key={item.id} 
                                ranking={item.ranking}
                                title={item.title} 
                                type={item.type}
                                director={item.director}
                                id={item.id}
                                deleteClick={(id) => this.deleteCard(id)}
                                editClick={(id)=>this.editCard(id)}/>
                        } else {
                            return <EditForm
                                key={item.id} 
                                title={item.title}
                                ranking={item.ranking}
                                type={item.type}
                                director={item.director}
                                id={item.id}
                                submitClick={(movie)=>this.updateCard(movie)}/>                        
                        }
                            
                    })}
                </CardDeck>
                {this.state.createMode 
                    ? <CreateForm                    
                        submitClick={(movie)=>this.createCard(movie)}
                        cancelClick={()=>this.cancelCreateForm()}
                        />
                    : <Button variant="warning" onClick={this.toggleMovieForm}>Create</Button>}
            </div>
        );
    }
}
  
  


export default List;
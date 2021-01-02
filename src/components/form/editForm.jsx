import  React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class EditForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            title: props.title,
            ranking: props.ranking,
            type: props.type,
            director: props.director,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        return this.props.submitClick({
            id: this.props.id,
            title: this.state.title,
            ranking: this.state.ranking,
            type: this.state.type,
            director: this.state.director,    
        })
    }
    handleChange(e, field) {
        e.preventDefault();
        this.setState({
            [field]: e.target.value,
        })
    }

    render() {
        return (
            <div>
                <Form>
                    <input 
                        placeholder={this.props.title} 
                        onChange={(e) => this.handleChange(e, "title")}
                        value={this.state.title}/>
                    <input 
                        placeholder={this.props.ranking} 
                        onChange={(e) => this.handleChange(e, "ranking")}
                        value={this.state.ranking}/>
                    <input 
                        placeholder={this.props.type} 
                        onChange={(e) => this.handleChange(e, "type")}
                        value={this.state.type}/>
                    <input 
                        placeholder={this.props.director} 
                        onChange={(e) => this.handleChange(e, "director")}
                        value={this.state.director}/>
                    <Button variant="success" type="submit" onClick={(e) => this.handleClick(e)}>Submit</Button>
                </Form>
            </div>
        )
    }
};

export default EditForm;
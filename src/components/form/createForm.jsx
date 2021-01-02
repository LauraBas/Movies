import  React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

class CreateForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
            ranking: "",
            type: "",
            director: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        return this.props.submitClick({
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
                        placeholder="title"
                        onChange={(e) => this.handleChange(e, "title")}
                        value={this.state.title}/>
                    <input 
                        placeholder="ranking" 
                        onChange={(e) => this.handleChange(e, "ranking")}
                        value={this.state.ranking}/>
                    <input 
                        placeholder="type"
                        onChange={(e) => this.handleChange(e, "type")}
                        value={this.state.type}/>
                    <input 
                        placeholder="director"
                        onChange={(e) => this.handleChange(e, "director")}
                        value={this.state.director}/>                
                    <Button variant="success"type="submit" onClick={(e) => this.handleClick(e)}>Submit</Button>
                </Form>
            </div>
        )
    }
};

export default CreateForm;
import  React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

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
                <Form style={{ width: '18rem' }}>                    
                    <Form.Group>
                        <Form.Control type="input" 
                            placeholder="title"
                            onChange={(e) => this.handleChange(e, "title")}
                            value={this.state.title}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="input" 
                            placeholder="ranking" 
                            onChange={(e) => this.handleChange(e, "ranking")}
                            value={this.state.ranking}/>
                    </Form.Group>                
                    <Form.Group>
                        <Form.Control type="input" 
                            placeholder="type"
                            onChange={(e) => this.handleChange(e, "type")}
                            value={this.state.type}/>
                    </Form.Group>
                    <Form.Group>
                            <Form.Control type="input"  
                            placeholder="director"
                            onChange={(e) => this.handleChange(e, "director")}
                            value={this.state.director}/>                
                    </Form.Group>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="success"type="submit" onClick={(e) => this.handleClick(e)}>Submit</Button>
                    </ButtonGroup>
                </Form>
            </div>
        )
    }
};

export default CreateForm;
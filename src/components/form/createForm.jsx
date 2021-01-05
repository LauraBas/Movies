import  React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Input from 'react-bootstrap/InputGroup';

class CreateForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
            image: "",
            ranking: "",
            type: "",
            director: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        return this.props.submitClick({
            title: this.state.title,
            image: this.state.image,
            ranking: this.state.ranking,
            type: this.state.type,
            director: this.state.director,
        })
    }
    handleCancelClick(e){
        e.preventDefault();
        return this.props.cancelClick()
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
                            placeholder="image"
                            onChange={(e) => this.handleChange(e, "image")}
                            value={this.state.image}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="number" 
                            max="10" min="1"
                            placeholder="ranking" 
                            onChange={(e) => this.handleChange(e, "ranking")}
                            value={this.state.ranking} />
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
                        <Button variant="success" type="submit" onClick={(e) => this.handleClick(e)}>Submit</Button>
                        <Button variant="info" onClick={(e) => this.handleCancelClick(e)}>Cancel</Button>
                    </ButtonGroup>
                </Form>
            </div>
        )
    }
};

export default CreateForm;
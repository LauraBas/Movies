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
        this.handleCancelClick = this.handleCancelClick.bind(this);
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

    handleCancelClick(e){
        e.preventDefault();
        return this.props.cancelEditClick()
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
                        placeholder={this.props.title} 
                        onChange={(e) => this.handleChange(e, "title")}
                        value={this.state.title}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="input" 
                        placeholder={this.props.ranking} 
                        onChange={(e) => this.handleChange(e, "ranking")}
                        value={this.state.ranking}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="input" 
                        placeholder={this.props.type} 
                        onChange={(e) => this.handleChange(e, "type")}
                        value={this.state.type}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="input" 
                        placeholder={this.props.director} 
                        onChange={(e) => this.handleChange(e, "director")}
                        value={this.state.director}/>
                    </Form.Group>
                    <Button variant="success" type="submit" onClick={(e) => this.handleClick(e)}>Submit</Button>
                    <Button variant="info" onClick={(e) => this.handleCancelClick(e)}>Cancel</Button>
                </Form>
            </div>
        )
    }
};

export default EditForm;
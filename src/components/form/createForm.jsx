import  React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

class CreateForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        return this.props.submitClick({title: this.state.title})
    }
    handleChange(e) {
        e.preventDefault();
        this.setState({
            title: e.target.value
        })
    }


    render() {
        return (
            <div>
                <Form>
                    <input placeholder="title"
                    onChange={this.handleChange}
                    value={this.state.title}
                    />                    
                    <Button variant="success"type="submit" onClick={(e) => this.handleClick(e)}>Submit</Button>
                </Form>
            </div>
        )
    }
};

export default CreateForm;